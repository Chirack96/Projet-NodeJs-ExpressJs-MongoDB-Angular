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
}