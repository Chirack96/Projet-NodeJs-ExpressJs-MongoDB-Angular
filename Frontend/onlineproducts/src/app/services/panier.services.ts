import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private apiUrl = 'http://localhost:3000';
  static isInPanier: boolean = false;

  constructor() {}

  async createUserProduct(user_id: string, product_id: string): Promise<any> {
    console.log(this.getUserProduct(user_id));
    const productCreated = { user_id, product_id };
    console.log(productCreated);
    await axios.post('http://localhost:3000/user-product/', productCreated)
    .then((response) => {
      console.log(response);
      
    })

    //console.log(response);
    //return response;
  }
  async getUserProduct(user_id: string): Promise<any> {
    await axios({
      url: 'http://localhost:3000/user-product/product',
      method: 'get',
      params: { user_id: user_id },
    }).then((response) => {
      console.log(response);
    });
    
    
  }
  async deleteUserProduct(id: string): Promise<any> {
    const response = await axios.delete(this.apiUrl + '/user-product/' + id);
    console.log(response);
    return response;
  }
}
