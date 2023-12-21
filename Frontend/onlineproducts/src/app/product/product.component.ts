import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../models/product.model';
import { AuthService } from '../services/auth.services';
import { PanierService } from '../services/panier.services';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
   @Input() product!: Products;
  constructor(private panierService: PanierService) {}

 

  buttonText!: string;
  isInPanier!: boolean;
   authService: AuthService = new AuthService();
  
  ngOnInit(): void {
    this.buttonText = "Add to cart";
   // this.isInPanier = this.product.isInPanier;
  
  }
  panierstatus(): void {
    let token = this.authService.isAuthenticated();
    console.log(token);
    //let isInPanier=this.panierService.getUserProduct(token.toString());
    this.panierService.createUserProduct(token.toString(), this.product.id.toString());
    /*if (this.product.isInPanier) {
      this.buttonText = "Remove from cart";
      this.panierService.createUserProduct(token.toString(), this.product.id.toString());
      
    }
    else {
      this.buttonText = "Add to cart";
      this.panierService.deleteUserProduct(this.product.id.toString()); 
      
    }*/
  }


}


