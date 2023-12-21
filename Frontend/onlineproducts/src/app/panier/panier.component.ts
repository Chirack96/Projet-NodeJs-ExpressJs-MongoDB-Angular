import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Products } from '../models/product.model';
import { PanierService } from '../services/panier.services';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent implements OnInit {
  panierProducts: Products[] = [];
  constructor(private panierService: PanierService) {}
  ngOnInit(): void {
    this.loadPanier();
  }
  async loadPanier() {
    const response = await this.panierService.getUserProduct('1');
    this.panierProducts = response.data;
  }
  isInPanier(): boolean {
        console.log(PanierService.isInPanier);
        return PanierService.isInPanier;
    }
  panierstatus(product: Products): void {
    /*if (product.isInPanier) {
      this.panierService.createUserProduct('1', product.id.toString());
      
    }
    else {
      this.panierService.deleteUserProduct('1');
    }*/
  }
}
