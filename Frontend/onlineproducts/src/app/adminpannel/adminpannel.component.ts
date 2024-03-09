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

  async startEdit(id: string) {
    this.editId = id;
  }

  async stopEdit(product: Products) {
    if (!this.editId) return;
    await this.productService.updateOneProduct(this.editId, product.title.toString(), product.description.toString(), product.imageUrl.toString(), Number(product.price));
    this.editId = null;
    await this.loadProducts(); // Rechargez les données après la sauvegarde
  }

  async confirmDeletion(id: string) {
    await this.productService.deleteOneProduct(id);
    await this.loadProducts(); // Rechargez les données après la suppression
  }
}
