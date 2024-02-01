import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Products } from '../models/product.model';
import { AuthService } from '../services/auth.services';
import { AxiosService } from '../services/axios.service';
import { PanierService } from '../services/panier.services';
import { ProductsService } from '../services/product.services';
@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
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
  isInPanier(): boolean {
    return PanierService.isInPanier;
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

}
