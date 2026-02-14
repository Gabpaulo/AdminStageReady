import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminFirebaseService, SpeechEntry, AdminUser } from '../services/admin-firebase.service';

@Component({
  selector: 'app-speeches',
  templateUrl: 'speeches.page.html',
  styleUrls: ['speeches.page.scss'],
  standalone: false,
})
export class SpeechesPage implements OnInit {
  speeches: SpeechEntry[] = [];
  filteredSpeeches: SpeechEntry[] = [];
  users: AdminUser[] = [];
  loading = true;
  error = '';

  // Filters
  searchQuery = '';
  filterType = 'all';
  filterUser = 'all';
  sortBy = 'date';
  dateFrom = '';
  dateTo = '';
  minScore = '';
  maxScore = '';

  // Aggregate stats (computed from filtered results)
  totalSpeeches = 0;
  avgOverall = 0;
  avgPace = 0;
  avgClarity = 0;
  avgFluency = 0;
  avgPitch = 0;
  totalDuration = 0;

  constructor(
    private adminFirebase: AdminFirebaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadSpeeches();
  }

  async loadSpeeches() {
    this.loading = true;
    this.error = '';
    try {
      this.users = await this.adminFirebase.getAllUsers();
      this.speeches = await this.adminFirebase.getAllSpeeches(this.users);
      this.applyFilters();
    } catch (err: any) {
      this.error = 'Failed to load speech data.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  computeStats() {
    const data = this.filteredSpeeches;
    this.totalSpeeches = data.length;
    if (data.length === 0) {
      this.avgOverall = 0;
      this.avgPace = 0;
      this.avgClarity = 0;
      this.avgFluency = 0;
      this.avgPitch = 0;
      this.totalDuration = 0;
      return;
    }

    const scored = data.filter(s => s.scores.overall > 0);
    const n = scored.length || 1;
    this.avgOverall = scored.reduce((a, s) => a + s.scores.overall, 0) / n;
    this.avgPace = scored.reduce((a, s) => a + s.scores.speech_pace, 0) / n;
    this.avgClarity = scored.reduce((a, s) => a + s.scores.articulation_clarity, 0) / n;
    this.avgFluency = scored.reduce((a, s) => a + s.scores.pausing_fluency, 0) / n;
    this.avgPitch = scored.reduce((a, s) => a + s.scores.pitch_variation, 0) / n;
    this.totalDuration = data.reduce((a, s) => a + (s.duration || 0), 0);
  }

  applyFilters() {
    let result = [...this.speeches];

    // Type filter
    if (this.filterType !== 'all') {
      result = result.filter(s => s.speechType === this.filterType);
    }

    // User filter
    if (this.filterUser !== 'all') {
      result = result.filter(s => s.userId === this.filterUser);
    }

    // Date range
    if (this.dateFrom) {
      const from = new Date(this.dateFrom);
      from.setHours(0, 0, 0, 0);
      result = result.filter(s => new Date(s.createdAt) >= from);
    }
    if (this.dateTo) {
      const to = new Date(this.dateTo);
      to.setHours(23, 59, 59, 999);
      result = result.filter(s => new Date(s.createdAt) <= to);
    }

    // Score range
    const min = this.minScore !== '' ? parseFloat(this.minScore) : null;
    const max = this.maxScore !== '' ? parseFloat(this.maxScore) : null;
    if (min !== null && !isNaN(min)) {
      result = result.filter(s => s.scores.overall >= min);
    }
    if (max !== null && !isNaN(max)) {
      result = result.filter(s => s.scores.overall <= max);
    }

    // Search (by name, email, transcript, or type)
    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      result = result.filter(s => {
        const user = this.users.find(u => u.uid === s.userId);
        const email = (user?.email || '').toLowerCase();
        return (s.userName || '').toLowerCase().includes(q) ||
          email.includes(q) ||
          (s.transcript || '').toLowerCase().includes(q) ||
          (s.speechType || '').toLowerCase().includes(q);
      });
    }

    // Sort
    if (this.sortBy === 'date') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (this.sortBy === 'score') {
      result.sort((a, b) => b.scores.overall - a.scores.overall);
    } else if (this.sortBy === 'duration') {
      result.sort((a, b) => b.duration - a.duration);
    } else if (this.sortBy === 'words') {
      result.sort((a, b) => b.wordCount - a.wordCount);
    }

    this.filteredSpeeches = result;
    this.computeStats();
  }

  onFilterChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchQuery = '';
    this.filterType = 'all';
    this.filterUser = 'all';
    this.sortBy = 'date';
    this.dateFrom = '';
    this.dateTo = '';
    this.minScore = '';
    this.maxScore = '';
    this.applyFilters();
  }

  get hasActiveFilters(): boolean {
    return this.searchQuery !== '' || this.filterType !== 'all' ||
      this.filterUser !== 'all' || this.dateFrom !== '' || this.dateTo !== '' ||
      this.minScore !== '' || this.maxScore !== '';
  }

  exportCSV() {
    const headers = [
      'User', 'Type', 'Overall', 'Pace', 'Clarity', 'Pitch', 'Fluency',
      'Loudness', 'Emphasis', 'Filler Words', 'Duration (s)', 'Words', 'WPM', 'Date', 'Transcript'
    ];
    const rows = this.filteredSpeeches.map(s => [
      s.userName || s.userId,
      s.speechType,
      s.scores.overall.toFixed(2),
      s.scores.speech_pace.toFixed(2),
      s.scores.articulation_clarity.toFixed(2),
      s.scores.pitch_variation.toFixed(2),
      s.scores.pausing_fluency.toFixed(2),
      s.scores.loudness_control.toFixed(2),
      s.scores.expressive_emphasis.toFixed(2),
      s.scores.filler_words.toFixed(2),
      Math.round(s.duration).toString(),
      s.wordCount.toString(),
      s.averagePace.toFixed(0),
      new Date(s.createdAt).toISOString(),
      (s.transcript || '').replace(/"/g, '""'),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(r => r.map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stageready-speeches-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  getUserName(userId: string): string {
    const user = this.users.find(u => u.uid === userId);
    if (!user) return userId;
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return name || user.email || userId;
  }

  viewUser(userId: string) {
    this.router.navigate(['/admin/users', userId]);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  formatScore(score: number): string {
    return score.toFixed(1);
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  }

  getScoreColor(score: number): string {
    if (score >= 3.5) return '#10b981';
    if (score >= 2.5) return '#f59e0b';
    if (score >= 1.5) return '#f97316';
    return '#ef4444';
  }
}
