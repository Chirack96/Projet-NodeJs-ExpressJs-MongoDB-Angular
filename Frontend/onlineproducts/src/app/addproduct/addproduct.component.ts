import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { Products } from '../models/product.model';
import { AuthService } from '../services/auth.services';
import { AxiosService } from '../services/axios.service';
import { ProductsService } from '../services/product.services';
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit{
  products: Products[] = [];
  authService: AuthService = new AuthService();


  newProduct = {title: '', description: '', imageUrl: '', price: 0, quantity: 0};
  selectedFile: File | null = null;
  constructor(@Inject(Router) private router: Router, private productsService: ProductsService, private axiosService: AxiosService) {}
  async ngOnInit(): Promise<void> {
    await this.loadProducts();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  async onSubmit() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    formData.append('title', this.newProduct.title);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString());
    formData.append('quantity', this.newProduct.quantity.toString());
    console.log(this.authService.isAuthenticated().toString());
    try {
      
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        console.error('Erreur lors de la récupération du token:', token);
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
       
        const response = await axios.post('http://localhost:3000/storeProduct', formData, { headers })
        .then((response) => {
        console.log(response);
        return response;
    }
    );
    
        
        // Réinitialiser le formulaire après l'envoi avec succès
        this.newProduct = {title: '', description: '', imageUrl: '', price: 0, quantity: 0};

        // Rafraîchir la liste des produits après l'ajout
        await this.loadProducts();
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données au backend:', error);
    }
    
}

private async loadProducts(): Promise<void> {
  console.log(this.authService.isAuthenticated().toString());
    try {
        const products = await this.productsService.getAllProducts();
        this.products = products;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
    }
}
}
