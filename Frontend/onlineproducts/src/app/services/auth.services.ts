import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  
  static isRegisteredIn: boolean = false;

  register(msg: boolean): boolean {
    if (msg) {
      AuthService.isRegisteredIn = true;
      return true;
    } else {
      AuthService.isRegisteredIn = false;
      return false;
    }
  }
  static isLoggedIn: boolean = false;

  constructor() {
    AuthService.checkInitialLoginState();
  }

  static checkInitialLoginState() {
    const token = localStorage.getItem('token');
    AuthService.isLoggedIn = !!token;
  }

  login(msg: boolean, token?: string): boolean {
    if (msg) {
      AuthService.isLoggedIn = true;
      if (token) {
        localStorage.setItem('token', token);
      }
      return true;
    } else {
      AuthService.isLoggedIn = false;
      return false;
    }
  }

  logout(): void {
    AuthService.isLoggedIn = false;
  }

  isAuthenticated(): String | boolean {
    let token = localStorage.getItem('token');
    if (token) {
      const [header, payload, signature] = token.split('.');
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.userId;
      
    } else {
      return false;
    }
  }
  getUsername(): String | boolean {
    let token = localStorage.getItem('token');
    if (token) {
      const [header, payload, signature] = token.split('.');
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.username;
    } else {
      return false;
    }
  }


  async getUserDetails(): Promise<any> {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      console.log('Aucun token trouvé, utilisateur non authentifié');
      return null;
    }

    try {
      const response = await axios.get('http://localhost:3000/auth/current', {
        headers: {
          'Authorization': `Bearer ${token}` // Envoyer le token dans l'en-tête Authorization
        }
      });
      console.log(response.data);
      return response.data; // Retourne directement les données de réponse pour un traitement ultérieur
    } catch (error: any) {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error.response ? error.response.data : error);
      return null;
    }
}

}