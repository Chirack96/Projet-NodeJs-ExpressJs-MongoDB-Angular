import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Products } from '../models/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../services/product.services';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  constructor(private ProductServices: ProductsService) { }
  ngOnInit(): void {
    this.products = this.ProductServices.getAllProducts();
  }

}
