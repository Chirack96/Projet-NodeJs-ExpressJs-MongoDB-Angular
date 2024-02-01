import { Injectable } from "@angular/core";
import axios from "axios";
import { Products } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
     private apiUrl = 'http://localhost:3000';
    products!: Products[];
    constructor() { }


  async createProduct(title: string, description: string, imageUrl: string, price: number, id: number, quantity: number): Promise<any> {
    const productData = { title, description, imageUrl, price, id, quantity};
    const response = await axios.post(this.apiUrl+'/storeProduct', productData)
    .then((response) => {
        console.log(response);
        return response;
    }
    )
    }
    async getAllProducts(): Promise<any> {
        const response = await axios.get(this.apiUrl+'/storeProduct');
        console.log(response);
        return response.data;
    }
    async getOneProduct(id: string): Promise<any> {
        const response = await axios.get(this.apiUrl+'/storeProduct/'+id);
        console.log(response);
        return response.data;
    }
    async deleteOneProduct(id: string): Promise<any> {
        const response = await axios.delete(this.apiUrl+'/storeProduct/'+id);
        console.log(response);
        return response.data;
    }
    async updateOneProduct(id: string, title: string, description: string, imageUrl: string, price: number): Promise<any> {
        const productData = { title, description, imageUrl, price };
        const response = await axios.put(this.apiUrl+'/auth/storeProduct/'+id, productData);
        console.log(response.data);
        return response.data;
    }
   
    
}