import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  subcription!: Subscription;
  loggInUser: User | null = null;
  appTitle: string = 'EmployeeMaster';
  constructor(public auth: AuthService, private router: Router) {
    this.auth.restoreSession();
  }
  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.subcription = this.auth.user$.subscribe(user => {
        this.loggInUser = user;
      });
      if (!this.loggInUser){
        this.auth.getUser();
      }
    }
  }

  logOut(): void {
    this.auth.logout();
  }

  gotoAgGridLib(): void {
    this.router.navigate(['/lib-ag-grid'])
  }

  gotoEmployeeMaster():void {
    this.router.navigate(['/employee'])
  }

  gotoAddEmployee():void {
    this.router.navigate(['/add-employee'])
  }

  ngOnDestroy(): void {
    this.loggInUser = null;
    if (this.subcription){
      this.subcription.unsubscribe();
    }
  }
}
