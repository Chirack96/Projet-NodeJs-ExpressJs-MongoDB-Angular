import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  
  static isRegisteredIn: boolean = false;
  static isLoggedIn: boolean = false;
  static isAdmin: boolean = false;
  username: string = '';
  
  register(msg: boolean): boolean {
    if (msg) {
      AuthService.isRegisteredIn = true;
      return true;
    } else {
      AuthService.isRegisteredIn = false;
      return false;
    }
  }

  constructor() {
    AuthService.checkInitialLoginState();
  }

  static checkInitialLoginState() {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    AuthService.isLoggedIn = !!token;
    AuthService.isAdmin = isAdmin;
  }

  login(msg: boolean, isAdmin: boolean, token?: string): boolean {
    if (msg) {
      AuthService.isLoggedIn = true;
      AuthService.isAdmin = isAdmin;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin.toString()); // Stocker le statut d'administration
        AuthService.isAdmin = isAdmin;
        localStorage.setItem('username', this.username);
      }
      return true;
    } else {
      AuthService.isLoggedIn = false;
      AuthService.isAdmin = false;
      return false;
    }
  }

  logout(): void {
    AuthService.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    AuthService.isAdmin = false;
    localStorage.removeItem('username');
    this.username = '';
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

 async getAllUsers(): Promise<any> {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
    console.log(token);
    if (!token && !isAdmin) {
      console.log('Aucun token trouvé, utilisateur non authentifié');
      return null;
      this
    }
  try {
    const response = await axios.get('http://localhost:3000/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la récupération des utilisateurs:', error.response ? error.response.data : error);
    return null;
  }
}}