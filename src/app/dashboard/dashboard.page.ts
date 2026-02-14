import { Component, OnInit } from '@angular/core';
import { AdminFirebaseService, DashboardStats } from '../services/admin-firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;
  error = '';

  constructor(private adminFirebase: AdminFirebaseService) {}

  async ngOnInit() {
    await this.loadStats();
  }

  async loadStats() {
    this.loading = true;
    this.error = '';
    try {
      this.stats = await this.adminFirebase.getDashboardStats();
    } catch (err: any) {
      this.error = 'Failed to load dashboard data. Check Firestore permissions.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  formatScore(score: number): string {
    return score.toFixed(1);
  }
}
