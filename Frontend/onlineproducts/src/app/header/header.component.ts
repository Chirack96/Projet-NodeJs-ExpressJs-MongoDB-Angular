import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { AuthService } from '../services/auth.services';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, ProductListComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    test=new AuthService;
   
    constructor(private authService: AuthService,@Inject(Router) private router: Router) {}

    isLoggedIn(): boolean {
        //console.log(AuthService.isLoggedIn);
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