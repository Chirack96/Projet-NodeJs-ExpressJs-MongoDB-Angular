import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Products } from '../models/product.model';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../services/product.services';
@Component({
    selector: 'app-product-list',
    standalone: true,
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
    imports: [CommonModule, ProductComponent, NzGridModule, NzPaginationModule]
})
export class ProductListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 100;

  products: Products[] = [];
  constructor(private ProductServices: ProductsService) { }
  async ngOnInit(): Promise<void> {
    this.products = await this.ProductServices.getAllProducts();
  }
  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    // Mettez à jour votre liste en fonction de la nouvelle page
  }
}

