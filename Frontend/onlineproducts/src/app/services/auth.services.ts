import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static isRegisteredIn: boolean = false;

  register(msg:boolean): boolean {
    if (msg) {
      AuthService.isRegisteredIn = true;
      return true;
    } else {
      AuthService.isRegisteredIn = false;
      return false;
    }
    
  }
  static isLoggedIn: boolean = false;

  login(msg:boolean): boolean {
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

  isAuthenticated(): boolean {
    // Retourner l'état de connexion actuel
    return AuthService.isLoggedIn;
  }
}
