import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Products } from '../models/product.model';
import { ProductsService } from '../services/product.services';
import { AuthService } from './../services/auth.services';


@Component({
  selector: 'app-adminpannel',
  templateUrl: './adminpannel.component.html',
  styleUrls: ['./adminpannel.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NzTableModule, NzTabsModule]
})
export class AdminPannelComponent implements OnInit {
  listOfProducts: Products[] = [];
  listOfData: any[] = [];
  editId: string | null = null;

  constructor(private productService: ProductsService, private authService: AuthService) {}

  async ngOnInit() {
    await this.loadProducts();
    await this.loadUsers();
  }

  async loadProducts() {
    const response = await this.productService.getAllProducts();
    this.listOfProducts = response;
  }

  async loadUsers(): Promise<void> {
    try {
      this.listOfData = await this.authService.getAllUsers();
    } catch (error) {
      // Gérer l'erreur, par exemple en affichant un message d'erreur à l'utilisateur
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
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