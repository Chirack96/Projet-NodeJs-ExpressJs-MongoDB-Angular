import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AuthService } from '../services/auth.services';
import { PanierService } from '../services/panier.services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    imports: [RouterModule, CommonModule, NzAvatarModule, NzToolTipModule, NzLayoutModule, NzBadgeModule],
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
    test=new AuthService;
    totalProducts = 0;
    username: string | null = null;

    constructor(private authService: AuthService, @Inject(Router) private router: Router, private panierService: PanierService) {
      this.username = localStorage.getItem('username');
        }

    ngOnInit(): void {
        this.loadDarkModePreference();
        this.updateTotalProducts();
       this.username = localStorage.getItem('username');
        
      }

      

      updateTotalProducts(): void {
        let token = this.authService.isAuthenticated();
        this.panierService.getUserProduct(token.toString()).then((response) => {
          this.totalProducts = response.reduce((acc: number, product: { quantity: number; }) => acc + product.quantity, 0);
        });
      }

      isLoggedIn(): boolean {
          return AuthService.isLoggedIn;
    }
    isAdmin(): boolean {
        return AuthService.isAdmin;
    }

    logout(): void {
        this.authService.logout();
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('username');
        this.username = null;
        this.router.navigate(['/login']);
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
