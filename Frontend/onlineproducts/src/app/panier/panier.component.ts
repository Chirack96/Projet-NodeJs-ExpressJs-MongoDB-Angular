import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Products } from '../models/product.model';
import { AuthService } from '../services/auth.services';
import { AxiosService } from '../services/axios.service';
import { PanierService } from '../services/panier.services';
import { ProductsService } from '../services/product.services';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule, NzGridModule, NzCardModule, NzButtonModule, NzAvatarModule, NzBadgeModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
})
export class PanierComponent implements OnInit {
  panierProducts: any[] = [];
  authService: AuthService = new AuthService();
  constructor(
    private panierService: PanierService,
    private axiosService: AxiosService,
    private productsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadPanier();
  }
  

  loadPanier(): void {
  let token = this.authService.isAuthenticated();
  this.panierService.getUserProduct(token.toString()).then((response) => {
    console.log('Produits chargés:', response);
    this.panierProducts = response;
    if (this.panierProducts.length > 0 && !this.panierProducts[0]._id) {
      console.error('Le premier produit dans le panier n\'a pas d\'ID défini.');
    }
  });
}


  async deletePanierProduct(id: string) {
    await this.panierService.deleteUserProduct(id);
    this.loadPanier();
  }
  async updatePanierProduct(id: string, title: string, description: string, imageUrl: string, price: number) {
    await this.productsService.updateOneProduct(id, title, description, imageUrl, price);
    this.loadPanier();
  }
  async createPanierProduct(title: string, description: string, imageUrl: string, price: number, id: number, quantity: number) {
    const panierProduct = await this.productsService.getOneProduct(id.toString());
    console.log(panierProduct);
    this.loadPanier();
  }

  addProductToCart(product: Products): void {
    this.panierService.createUserProduct(
      this.authService.isAuthenticated().toString(),
      product._id.toString()
      );
  }
  
  removeProductFromCart(id: String): void {
    this.panierService.deleteUserProduct(
      
      id.toString()
      ).then(()=>{
        this.loadPanier();
      });
  }
  clearCart(): void {
    this.panierService.clearUserCart(this.authService.isAuthenticated().toString());
  }

  async increaseQuantity(productId: string): Promise<void> {
  const user_id = this.authService.isAuthenticated().toString();
  const product = this.panierProducts.find(p => p.id === productId);
  if (product) {
    const newQuantity = product.quantity + 1;
    await this.panierService.updateProductQuantity(user_id, productId, newQuantity);
    this.loadPanier();
  }
}

async decreaseQuantity(productId: string): Promise<void> {
  const user_id = this.authService.isAuthenticated().toString();
  const product = this.panierProducts.find(p => p.id === productId);
  if (product && product.quantity > 1) {
    const newQuantity = product.quantity - 1;
    await this.panierService.updateProductQuantity(user_id, productId, newQuantity);
    this.loadPanier();
  }
}

getTotalPrice(): number {
  return this.panierProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);
}

  getQuantity(): number {
    return this.panierProducts.reduce((acc, product) => acc + product.quantity, 0);
  }

  payment(): void {
    localStorage.setItem('paymentStarted', 'true');
    this.router.navigate(['/payment']);
  }
  getPaymentButtonText(): string {
  const paymentStarted = localStorage.getItem('paymentStarted');
  return paymentStarted ? 'Continuer votre achat' : 'Payer';
}

  
}
