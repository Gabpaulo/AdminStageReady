import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AdminFirebaseService, AdminUser, SpeechEntry,
  UserGamification, UserBadgeProgress
} from '../services/admin-firebase.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: 'user-detail.page.html',
  styleUrls: ['user-detail.page.scss'],
  standalone: false,
})
export class UserDetailPage implements OnInit {
  uid = '';
  user: AdminUser | null = null;
  speeches: SpeechEntry[] = [];
  gamification: UserGamification | null = null;
  badges: UserBadgeProgress | null = null;
  loading = true;
  error = '';
  activeTab: 'overview' | 'speeches' | 'badges' = 'overview';

  // Edit mode
  editing = false;
  editForm: Partial<AdminUser> = {};
  saving = false;
  saveMessage = '';

  // Gamification edit
  editingGamification = false;
  gamificationForm: Partial<UserGamification> = {};
  savingGamification = false;

  // Generic confirmation modal
  showConfirmModal = false;
  confirmTitle = '';
  confirmMessage = '';
  confirmButtonText = '';
  confirmButtonClass = 'btn-danger';
  confirmAction: (() => void) | null = null;
  confirming = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminFirebase: AdminFirebaseService
  ) {}

  async ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    if (!this.uid) {
      this.router.navigate(['/admin/users']);
      return;
    }
    await this.loadUserData();
  }

  async loadUserData() {
    this.loading = true;
    this.error = '';
    try {
      const [user, speeches, gamification, badges] = await Promise.all([
        this.adminFirebase.getUser(this.uid),
        this.adminFirebase.getUserSpeeches(this.uid),
        this.adminFirebase.getUserGamification(this.uid),
        this.adminFirebase.getUserBadges(this.uid),
      ]);
      this.user = user;
      this.speeches = speeches;
      this.gamification = gamification;
      this.badges = badges;
    } catch (err: any) {
      this.error = 'Failed to load user data.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(['/admin/users']);
  }

  // ── Edit ───────────────────────────────────────────────

  startEdit() {
    if (!this.user) return;
    this.editForm = {
      firstName: this.user.firstName || '',
      lastName: this.user.lastName || '',
      age: this.user.age,
      gender: this.user.gender || '',
      phoneNumber: this.user.phoneNumber || '',
      bio: this.user.bio || '',
    };
    this.editing = true;
    this.saveMessage = '';
  }

  cancelEdit() {
    this.editing = false;
    this.saveMessage = '';
  }

  async saveEdit() {
    this.saving = true;
    this.saveMessage = '';
    try {
      await this.adminFirebase.updateUser(this.uid, this.editForm);
      this.user = await this.adminFirebase.getUser(this.uid);
      this.editing = false;
      this.saveMessage = 'User updated successfully.';
      setTimeout(() => this.saveMessage = '', 3000);
    } catch (err: any) {
      this.saveMessage = 'Failed to save changes.';
      console.error(err);
    } finally {
      this.saving = false;
    }
  }

  // ── Confirmation Modal ─────────────────────────────────

  showConfirm(title: string, message: string, buttonText: string, buttonClass: string, action: () => void) {
    this.confirmTitle = title;
    this.confirmMessage = message;
    this.confirmButtonText = buttonText;
    this.confirmButtonClass = buttonClass;
    this.confirmAction = action;
    this.confirming = false;
    this.showConfirmModal = true;
  }

  cancelConfirm() {
    this.showConfirmModal = false;
    this.confirmAction = null;
  }

  async executeConfirm() {
    if (!this.confirmAction) return;
    this.confirming = true;
    try {
      await this.confirmAction();
    } finally {
      this.confirming = false;
      this.showConfirmModal = false;
      this.confirmAction = null;
    }
  }

  // ── Role management ────────────────────────────────────

  confirmToggleRole() {
    if (!this.user) return;
    const newRole = this.user.role === 'admin' ? 'user' : 'admin';
    const action = newRole === 'admin' ? 'promote to Admin' : 'remove Admin role from';
    this.showConfirm(
      newRole === 'admin' ? 'Make Admin' : 'Remove Admin',
      `Are you sure you want to ${action} <strong>${this.getDisplayName()}</strong>?`,
      newRole === 'admin' ? 'Make Admin' : 'Remove Admin',
      newRole === 'admin' ? 'btn-primary' : 'btn-warning',
      async () => {
        await this.adminFirebase.setUserRole(this.uid, newRole);
        this.user!.role = newRole;
        this.saveMessage = `Role updated to ${newRole}.`;
        setTimeout(() => this.saveMessage = '', 3000);
      }
    );
  }

  // ── Gamification Edit ──────────────────────────────────

  startGamificationEdit() {
    this.gamificationForm = {
      level: this.gamification?.level || 1,
      currentXP: this.gamification?.currentXP || 0,
      totalXP: this.gamification?.totalXP || 0,
      currentStreak: this.gamification?.currentStreak || 0,
      longestStreak: this.gamification?.longestStreak || 0,
    };
    this.editingGamification = true;
    this.saveMessage = '';
  }

  cancelGamificationEdit() {
    this.editingGamification = false;
  }

  async saveGamificationEdit() {
    this.savingGamification = true;
    this.saveMessage = '';
    try {
      await this.adminFirebase.updateUserGamification(this.uid, this.gamificationForm);
      this.gamification = await this.adminFirebase.getUserGamification(this.uid);
      this.editingGamification = false;
      this.saveMessage = 'Gamification stats updated successfully.';
      setTimeout(() => this.saveMessage = '', 3000);
    } catch (err: any) {
      this.saveMessage = 'Failed to save gamification changes.';
      console.error(err);
    } finally {
      this.savingGamification = false;
    }
  }

  // ── Delete ─────────────────────────────────────────────

  confirmDelete() {
    this.showConfirm(
      'Delete User',
      `Are you sure you want to delete <strong>${this.getDisplayName()}</strong>? This will permanently remove all their data including speeches, badges, and gamification stats.`,
      'Delete Permanently',
      'btn-danger',
      async () => {
        await this.adminFirebase.deleteUser(this.uid);
        this.router.navigate(['/admin/users']);
      }
    );
  }

  confirmDeleteSpeech(speechId: string) {
    this.showConfirm(
      'Delete Speech',
      'Are you sure you want to delete this speech? This action cannot be undone.',
      'Delete Speech',
      'btn-danger',
      async () => {
        await this.adminFirebase.deleteSpeech(this.uid, speechId);
        this.speeches = this.speeches.filter(s => s.id !== speechId);
        this.saveMessage = 'Speech deleted successfully.';
        setTimeout(() => this.saveMessage = '', 3000);
      }
    );
  }

  // ── Export ───────────────────────────────────────────────

  exportSpeeches() {
    const name = this.getDisplayName();
    const headers = [
      'Type', 'Overall', 'Pace', 'Clarity', 'Pitch', 'Fluency',
      'Loudness', 'Emphasis', 'Filler Words', 'Duration (s)', 'Words', 'WPM', 'Date', 'Transcript'
    ];
    const rows = this.speeches.map(s => [
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
    const safeName = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    link.download = `speeches-${safeName}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // ── Helpers ────────────────────────────────────────────

  getDisplayName(): string {
    if (!this.user) return 'Unknown';
    const name = `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim();
    return name || this.user.email || 'Unknown';
  }

  getInitials(): string {
    if (!this.user) return '?';
    const first = (this.user.firstName || '')[0] || '';
    const last = (this.user.lastName || '')[0] || '';
    if (first || last) return (first + last).toUpperCase();
    return (this.user.email || 'U')[0].toUpperCase();
  }

  getAverageScore(): number {
    if (!this.speeches.length) return 0;
    const sum = this.speeches.reduce((acc, s) => acc + s.scores.overall, 0);
    return sum / this.speeches.length;
  }

  getTotalDuration(): number {
    return this.speeches.reduce((acc, s) => acc + (s.duration || 0), 0);
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  formatScore(score: number): string {
    return score.toFixed(1);
  }

  getScoreColor(score: number): string {
    if (score >= 3.5) return '#10b981';
    if (score >= 2.5) return '#f59e0b';
    if (score >= 1.5) return '#f97316';
    return '#ef4444';
  }

  getUnlockedBadges(): any[] {
    return (this.badges?.badges || []).filter((b: any) => b.isUnlocked);
  }

  getLockedBadges(): any[] {
    return (this.badges?.badges || []).filter((b: any) => !b.isUnlocked);
  }

  confirmToggleBadge(badge: any) {
    if (!this.badges) return;
    const willUnlock = !badge.isUnlocked;
    this.showConfirm(
      willUnlock ? 'Unlock Badge' : 'Lock Badge',
      `Are you sure you want to ${willUnlock ? 'unlock' : 'lock'} the badge <strong>"${badge.name}"</strong>?`,
      willUnlock ? 'Unlock' : 'Lock',
      willUnlock ? 'btn-primary' : 'btn-warning',
      async () => {
        badge.isUnlocked = willUnlock;
        await this.adminFirebase.updateUserBadges(this.uid, this.badges!.badges);
        this.badges!.unlockedBadges = this.badges!.badges.filter((b: any) => b.isUnlocked).length;
        this.saveMessage = `Badge "${badge.name}" ${willUnlock ? 'unlocked' : 'locked'}.`;
        setTimeout(() => this.saveMessage = '', 3000);
      }
    );
  }
}
