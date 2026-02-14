import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminFirebaseService } from '../services/admin-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;
  checkingSetup = true;
  needsSetup = false;
  showSetup = false;

  // Setup form
  setupFirstName = '';
  setupLastName = '';
  setupEmail = '';
  setupPassword = '';
  setupConfirmPassword = '';

  constructor(
    private adminFirebase: AdminFirebaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.checkingSetup = true;
    try {
      const hasAdmin = await this.adminFirebase.hasAnyAdmin();
      this.needsSetup = !hasAdmin;
      this.showSetup = this.needsSetup;
    } catch {
      // Firestore rules may block unauthenticated reads — default to showing login with toggle
      this.needsSetup = false;
      this.showSetup = false;
    } finally {
      this.checkingSetup = false;
    }
  }

  toggleMode() {
    this.showSetup = !this.showSetup;
    this.errorMessage = '';
  }

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const user = await this.adminFirebase.login(this.email, this.password);

      // Verify admin role
      const isAdmin = await this.adminFirebase.isAdmin(user.uid);
      if (!isAdmin) {
        await this.adminFirebase.logout();
        this.errorMessage = 'Access denied. This account does not have admin privileges.';
        return;
      }

      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        this.errorMessage = 'Invalid email or password.';
      } else {
        this.errorMessage = 'Login failed. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }

  async onSetup() {
    if (!this.setupEmail || !this.setupPassword || !this.setupFirstName || !this.setupLastName) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.setupPassword !== this.setupConfirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.setupPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      await this.adminFirebase.createAdminAccount(
        this.setupEmail, this.setupPassword,
        this.setupFirstName, this.setupLastName
      );
      this.router.navigate(['/admin/dashboard']);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'Password is too weak. Use at least 6 characters.';
      } else {
        this.errorMessage = error.message || 'Setup failed. Please try again.';
      }
    } finally {
      this.loading = false;
    }
  }
}
