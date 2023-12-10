import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  @Input() product!: Products;

  buttonText!: string;
  panierService: any;
  
  ngOnInit(): void {
    this.buttonText = "Add to cart";
  
  }
  addToCart() {
  if (this.buttonText === 'Add to cart') {
    this.buttonText = "Remove from cart";
  }
  else {
    this.buttonText = "Add to cart";

  }
  }
}
