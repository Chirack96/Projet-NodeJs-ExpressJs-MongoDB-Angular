import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  async createUserProduct(user_id: string, product_id: string, quantity: number = 1): Promise<any> {
    const response = await this.getUserProduct(user_id);
    const panierProducts = response ? response : [];
    const product = panierProducts.find((p: { product_id: string; }) => p.product_id === product_id);

    if (product) {
      // Si le produit existe déjà, mettre à jour la quantité
      return this.updateProductQuantity(user_id, product_id, product.quantity + 1);
    } else {
      // Sinon, créer un nouveau produit dans le panier
      const productCreated = { user_id, product_id, quantity };
      return axios.post(`${this.apiUrl}/user-product/`, productCreated)
        .then(response => response.data)
        .catch(error => error.response.data);
        console.log(productCreated);
    }
  }

  async updateProductQuantity(user_id: string, product_id: string, quantity: number): Promise<any> {
  return axios.put(`${this.apiUrl}/user-product/update`, { user_id, product_id, quantity })
    .then(response => response.data)
    .catch(error => console.error('Erreur lors de la mise à jour de la quantité', error));
}


  async clearUserCart(user_id: string): Promise<any> {
    return axios.delete(`${this.apiUrl}/user-product/clear`, { params: { user_id } })
      .then(response => response.data)
      .catch(error => error.response.data);
  }

  async getUserProduct(user_id: string): Promise<any> {
    return axios.get(`${this.apiUrl}/user-product/product`, { params: { user_id } })
      .then(response => response.data)
      .catch(error => error.response.data);
  }

  async deleteUserProduct(product_id: string): Promise<any> {
    return axios.delete(`${this.apiUrl}/user-product/delete`, { params: { product_id } })
      .then(response => response.data)
      .catch(error => error.response.data);
  }
}
