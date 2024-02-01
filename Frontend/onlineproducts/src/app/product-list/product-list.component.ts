import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { Products } from '../models/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../services/product.services';
@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
    imports: [CommonModule, ProductComponent, AsideComponent]
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  constructor(private ProductServices: ProductsService) { }
  async ngOnInit(): Promise<void> {
    this.products = await this.ProductServices.getAllProducts();
  }
}

