import { Injectable } from "@angular/core";
import { Products } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    
    products: Products[] = [
        {
            id: 1,
            title: 'Product 1',
            imageUrl: 'https://via.placeholder.com/200x150',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 100,
            category: 'category 1',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        
        },
        {
            id: 2,
            title: 'Product 2',
            imageUrl: 'https://via.placeholder.com/200x150',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 150,
            category: 'category 2',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 3,
            title: 'Product 3',
            imageUrl: 'https://via.placeholder.com/200x150',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 200,
            category: 'category 3',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 4,
            title: 'Product 4',
            imageUrl: 'https://via.placeholder.com/200x150',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 250,
            category: 'category 4',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        ];
        getAllProducts(): Products[] {
            return this.products;
        }
    }
