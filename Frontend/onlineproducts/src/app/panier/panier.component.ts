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
  test: Array<Products> = [];
  panierProducts: Array<Products> = [];
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
  async loadPanier() {
    console.log(this.authService.isAuthenticated().toString());
    const response = await this.panierService.getUserProduct(
      this.authService.isAuthenticated().toString()
    );
    this.panierProducts = response;
    console.log(response);
    console.log(this.panierProducts);
    console.log(this.productsService.products);
    let test = this.panierProducts
      .map((product) => {
        return this.productsService.products.find(
          (product_) => product_.id == product.id
        );
      })
      .filter((product) => product !== undefined) as Products[];
    console.log(test);
    this.panierProducts = test;
    return test;
    //this.panierProducts.push(response.data);
  }

  panierStatus(product: Products): void {
    if (this.isInPanier() === false) {
      this.panierService.createUserProduct('1', product.id.toString());
    } else {
      this.panierService.deleteUserProduct(product.id.toString());
    }
  }
}
