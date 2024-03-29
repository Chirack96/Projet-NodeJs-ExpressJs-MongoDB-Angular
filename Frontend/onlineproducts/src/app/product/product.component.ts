import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Products } from '../models/product.model';
import { AuthService } from '../services/auth.services';
import { PanierService } from '../services/panier.services';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzCardModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
   @Input() product!: Products;
  constructor(private panierService: PanierService, @Inject(Router) private router: Router ) {}

 

  buttonText!: string;
  isInPanier!: boolean;
   authService: AuthService = new AuthService();
   isLoggedIn(): boolean {
        return AuthService.isLoggedIn;
    }
  
  ngOnInit(): void {
    this.buttonText = "Add to cart";
  
  }
  addToCart(): void {
    if (this.isLoggedIn()) {
      this.panierService.createUserProduct(
        this.authService.isAuthenticated().toString(),
        this.product._id.toString(),
      );
    
    } else {
      this.router.navigate(['/login']);
    }
  }
isLoadingOne = false;
  isLoadingTwo = false;

  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 300);
  }

  loadTwo(): void {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
  }


}

  


