import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Products } from '../models/product.model';
import { ProductsService } from '../services/product.services';

@Component({
  selector: 'app-adminpannel',
  templateUrl: './adminpannel.component.html',
  styleUrls: ['./adminpannel.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule]
})
export class AdminPannelComponent implements OnInit {
  listOfProducts: Products[] = [];
  editId: string | null = null;

  constructor(private productService: ProductsService) {}

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    const response = await this.productService.getAllProducts();
    this.listOfProducts = response;
  }

  startEdit(id: string): void {
    this.editId = id;
  }

  async stopEdit(product: Products): Promise<void> {
    if (!this.editId) return;
    await this.productService.updateOneProduct(this.editId, product.title.toString(), product.description.toString(), product.imageUrl.toString(), product.price as number);
    this.editId = null;
    await this.loadProducts(); // Recharges les produits après la mise à jour
  }

  async confirmDeletion(id: string): Promise<void> {
    await this.productService.deleteOneProduct(id);
    await this.loadProducts(); // Recharges les produits après suppression
  }
}
