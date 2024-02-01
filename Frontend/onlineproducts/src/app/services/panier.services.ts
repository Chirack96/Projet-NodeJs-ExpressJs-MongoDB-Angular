import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.services';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private apiUrl = 'http://localhost:3000';
  static isInPanier: boolean = false;

  constructor() {}
  authService: AuthService = new AuthService();
  
isInPanier(): boolean {
  return PanierService.isInPanier;
}
  async createUserProduct(user_id: string, product_id: string,): Promise<any> {
  
    console.log(this.getUserProduct(user_id));
    const productCreated = { user_id, product_id, };
    console.log(productCreated);
    await axios.post('http://localhost:3000/user-product/', productCreated)
    .then((response) => {
      console.log(response);
      return response.data;
      
    }
    )

  }
  async getUserProduct(user_id: string): Promise<any> {
    console.log(user_id);
    const response_=await axios.get('http://localhost:3000/user-product/product',{
      params: { user_id: user_id },
    }).then((response) => {
      console.log(response);
      return response.data;
    });
    return response_;
    
  }
  async deleteUserProduct(id: string): Promise<any> {
    const response = await axios.delete('http://localhost:3000/user-product/delete', {
      params: { product_id: id },
      });
    console.log(response);
    return response;
    return response.data;
  }
}