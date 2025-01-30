

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Example service to manage authentication
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) { }


  canActivate(): boolean {
    this.authService.isAdmin();
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'warn',
        detail: 'Please login to access this page',
        life: 3000,
      });
      this.router.navigate(['/signin']); // Redirect to login if not authenticated
      return false;
    }
  }
}
