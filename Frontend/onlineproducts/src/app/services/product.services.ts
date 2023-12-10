import { Injectable } from "@angular/core";
import { Products } from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    
    products: Products[] = [
        {
            id: 1,
            title: 'Jordan 4 Retro',
            imageUrl: '/assets/Nintendo x Air Jordan 4 Retro Bred Super Mario.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 100,
            category: 'category 1',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        
        },
        {
            id: 2,
            title: 'Playstation 5',
            imageUrl: '/assets/5.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 150,
            category: 'category 2',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 3,
            title: 'IPHONE 14 PRO',
            imageUrl: '/assets/6.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 200,
            category: 'category 3',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 4,
            title: 'IPAD PRO',
            imageUrl: '/assets/7.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 250,
            category: 'category 4',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 5,
            title: 'Bycycle',
            imageUrl: '/assets/8.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 300,
            category: 'category 5',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 6,
            title: 'SOFA',
            imageUrl: '/assets/canape-moderne-challenger(1).jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 350,
            category: 'category 6',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 7,
            title: 'microwave',
            imageUrl: '/assets/1.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 400,
            category: 'category 7',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 8,
            title: 'Fer a repasser',
            imageUrl: '/assets/2.webp',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 450,
            category: 'category 8',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        {
            id: 9,
            title: 'Costume',
            imageUrl: '/assets/3.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat',
            price: 500,
            category: 'category 9',
            createDate: new(Date),
            location: 'Paris',
            quantity: 1
        },
        ];
        getAllProducts(): Products[] {
            return this.products;
        }
    }
