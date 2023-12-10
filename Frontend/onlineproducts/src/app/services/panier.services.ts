import { Injectable } from '@angular/core';
import { Products } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panier: Products[] = [];

  addToPanier(product: Products): void {
    this.panier.push(product);
    console.log(this.panier);
  }

  getPanier(): Products[] {
    return this.panier;
  }
}