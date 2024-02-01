import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  async login(username: string, password: string): Promise<any> {
    const loginData = { username, password };
    const response = await axios.post(`${this.apiUrl}/login`, loginData);
    console.log('Login successful', response);
    return response;
  }

  async register(username: string, password: string): Promise<any> {
    const registerData = { username, password };
    const response = await axios.post(`${this.apiUrl}/register`, registerData);
    console.log('Register successful', response);
    return response;
  }
  async create_user_product(user_id: string, product_id: string): Promise<any> {
    const product_created = { user_id, product_id };
    const response = await axios.post(this.apiUrl+'/user-product', product_created);
    console.log(response);
    return response;
  }
  async get_user_product(user_id: string): Promise<any> {
    const response = await axios.get(this.apiUrl+'/user-product/'+user_id);
    console.log(response);
    return response;
  }
   async delete_user_product(id: string): Promise<any> {
    const response = await axios.delete(this.apiUrl+'/user-product/'+id);
    console.log(response);
    return response;
  }
  
}
