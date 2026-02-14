import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminFirebaseService, AdminUser } from '../services/admin-firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  standalone: false,
})
export class UsersPage implements OnInit {
  users: AdminUser[] = [];
  filteredUsers: AdminUser[] = [];
  searchQuery = '';
  filterRole = 'all';
  filterGender = 'all';
  sortBy = 'name';
  loading = true;
  error = '';

  constructor(
    private adminFirebase: AdminFirebaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    this.error = '';
    try {
      this.users = await this.adminFirebase.getAllUsers();
      this.applyFilters();
    } catch (err: any) {
      this.error = 'Failed to load users.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  applyFilters() {
    let result = [...this.users];

    // Search
    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      result = result.filter(u =>
        (u.firstName || '').toLowerCase().includes(q) ||
        (u.lastName || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q)
      );
    }

    // Role filter
    if (this.filterRole !== 'all') {
      result = result.filter(u => (u.role || 'user') === this.filterRole);
    }

    // Gender filter
    if (this.filterGender !== 'all') {
      result = result.filter(u => (u.gender || '').toLowerCase() === this.filterGender.toLowerCase());
    }

    // Sort
    if (this.sortBy === 'name') {
      result.sort((a, b) => this.getDisplayName(a).localeCompare(this.getDisplayName(b)));
    } else if (this.sortBy === 'date') {
      result.sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      });
    } else if (this.sortBy === 'role') {
      result.sort((a, b) => (a.role || 'user').localeCompare(b.role || 'user'));
    }

    this.filteredUsers = result;
  }

  onFilterChange() {
    this.applyFilters();
  }

  viewUser(uid: string) {
    this.router.navigate(['/admin/users', uid]);
  }

  exportCSV() {
    const headers = ['Name', 'Email', 'Role', 'Gender', 'Age', 'Phone', 'Bio', 'Joined'];
    const rows = this.filteredUsers.map(u => [
      this.getDisplayName(u),
      u.email || '',
      u.role || 'user',
      u.gender || '',
      u.age?.toString() || '',
      u.phoneNumber || '',
      (u.bio || '').replace(/"/g, '""'),
      u.createdAt ? new Date(u.createdAt).toISOString() : '',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(r => r.map(v => `"${v}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stageready-users-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  getDisplayName(user: AdminUser): string {
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    return name || user.email || 'Unknown User';
  }

  getInitials(user: AdminUser): string {
    const first = (user.firstName || '')[0] || '';
    const last = (user.lastName || '')[0] || '';
    if (first || last) return (first + last).toUpperCase();
    return (user.email || 'U')[0].toUpperCase();
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }
}
