import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
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
  imports: [CommonModule, FormsModule, NzGridModule, NzCardModule, NzButtonModule, NzAvatarModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
})
export class PanierComponent implements OnInit {
  panierProducts: any[] = [];
  authService: AuthService = new AuthService();
  constructor(
    private panierService: PanierService,
    private axiosService: AxiosService,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.loadPanier();
  }
  

  loadPanier(): void {
    let token = this.authService.isAuthenticated();
    console.log(token);
    this.panierService.getUserProduct(token.toString()).then((response) => {
      console.log(response);
      this.panierProducts = response;
      console.log(this.panierProducts);
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

  increaseQuantity(productId: string): void {
  const product = this.panierProducts.find(p => p.id_product === productId);
  if (product) {
    this.panierService.updateProductQuantity(this.authService.isAuthenticated().toString(), productId, product.quantity + 1)
      .then(() => {
        product.quantity += 1; // Mise à jour locale pour éviter de recharger tout le panier
        //this.loadPanier(); // Optionnel selon la nécessité de recharger tout le panier
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la quantité:', error);
        // Gérer l'erreur (afficher un message à l'utilisateur, par exemple)
      });
  }
}

decreaseQuantity(productId: string): void {

  const product = this.panierProducts.find(p => p.id_product === productId);
  if (product && product.quantity > 1) {
    this.panierService.updateProductQuantity(this.authService.isAuthenticated().toString(), productId, product.quantity - 1)
      .then(() => {
        product.quantity -= 1;
        // this.loadPanier(); // Optionnel selon la nécessité de recharger tout le panier
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la quantité:', error);
      });
  }
}

  getTotalPrice(): number {
    return this.panierProducts.reduce((acc, product) => acc + product.price, 0);
  }
  getQuantity(): number {
    return this.panierProducts.reduce((acc, product) => acc + product.quantity, 0);
  }
  getSubTotalPrice(): number {
    return this.panierProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }
  
}
