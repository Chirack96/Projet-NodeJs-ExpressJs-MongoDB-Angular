import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  login(msg: boolean): boolean {
    if (msg) {
      AuthService.isLoggedIn = true;
      return true;
    } else {
      AuthService.isLoggedIn = false;
      return false;
    }
  }

  logout(): void {
    // Logique de déconnexion
    // Réinitialiser l'état de connexion
    AuthService.isLoggedIn = false;
  }

  isAuthenticated(): String | boolean {
    // Retourner l'état de connexion actuel
    let token = localStorage.getItem('token');
    if (token) {
      // Split the token into header, payload, and signature
      const [header, payload, signature] = token.split('.');

      // Decode the base64-encoded header and payload
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));

      // Return the decoded header and payload
      return decodedPayload.userId;
      
    } else {
      return false;
    }
    // return AuthService.isLoggedIn;
  }
}
