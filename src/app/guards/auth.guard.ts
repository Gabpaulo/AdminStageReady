import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminFirebaseService } from '../services/admin-firebase.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private adminFirebase: AdminFirebaseService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = await this.adminFirebase.waitForAuth();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if user has admin role
    const isAdmin = await this.adminFirebase.isAdmin(user.uid);
    if (!isAdmin) {
      await this.adminFirebase.logout();
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
