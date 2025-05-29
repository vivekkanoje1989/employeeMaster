import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'user';
  isLoggedIn = signal(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const isAdmin = username === 'admin' && password === 'admin';
    const isEmployee = username === 'employee' && password === 'employee';

    if (isAdmin || isEmployee) {
      const user: User = {
        username,
        role: isAdmin ? 'admin' : 'employee',
        token: btoa(new Date().toISOString())
      };
      this.setUser(user);
      this.isLoggedIn.set(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }

    return false;
  }

  setUser(user: User) {
    this.userSubject.next(user);
    sessionStorage.setItem(this.userKey, JSON.stringify({ ...user }));
  }

  logout(): void {
    sessionStorage.removeItem(this.userKey);
    this.isLoggedIn.set(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem(this.userKey);
  }

  getUser(): User | null {
    const user = sessionStorage.getItem(this.userKey);
    const updateUser = user ? JSON.parse(user) : null;
    this.userSubject.next(updateUser);
    return user ? { ...JSON.parse(user) } : null;
  }

  getRole(): 'admin' | 'employee' | null {
    return this.getUser()?.role || null;
  }

  restoreSession() {
    const stored = localStorage.getItem('isLoggedIn');
    this.isLoggedIn.set(stored === 'true');
  }
}
