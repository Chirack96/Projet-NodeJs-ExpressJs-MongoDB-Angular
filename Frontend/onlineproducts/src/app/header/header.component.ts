import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AuthService } from '../services/auth.services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterModule, CommonModule, NzAvatarModule, NzToolTipModule, NzLayoutModule],
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
    test=new AuthService;
   
    constructor(private authService: AuthService,@Inject(Router) private router: Router) {}

    ngOnInit(): void {
    this.loadDarkModePreference();
  }

    isLoggedIn(): boolean {
        return AuthService.isLoggedIn;
    }

    logout(): void {
        this.authService.logout();
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
  }
  getAllProducts(): void {
    this.router.navigate(['/home']);
}
toggleDarkMode(): void {
    const body = document.body;
    body.classList.toggle('ant-dark');
    localStorage.setItem('darkMode', body.classList.contains('ant-dark') ? 'enabled' : 'disabled');
  }

  private loadDarkModePreference(): void {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    document.body.classList.toggle('ant-dark', darkModeEnabled);
  }
}
