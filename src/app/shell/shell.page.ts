import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminFirebaseService } from '../services/admin-firebase.service';

@Component({
  selector: 'app-shell',
  templateUrl: 'shell.page.html',
  styleUrls: ['shell.page.scss'],
  standalone: false,
})
export class ShellPage {
  sidebarCollapsed = false;

  navItems = [
    { label: 'Dashboard', icon: 'grid-outline', route: '/admin/dashboard' },
    { label: 'Users', icon: 'people-outline', route: '/admin/users' },
    { label: 'Speeches', icon: 'mic-outline', route: '/admin/speeches' },
  ];

  constructor(
    private adminFirebase: AdminFirebaseService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  async onLogout() {
    await this.adminFirebase.logout();
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
