import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { AuthService } from '../services/auth.services';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterModule, CommonModule, NzAvatarModule, NzToolTipModule],
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    test=new AuthService;
   
    constructor(private authService: AuthService,@Inject(Router) private router: Router) {}

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
}
