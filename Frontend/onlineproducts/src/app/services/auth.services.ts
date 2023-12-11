import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  register(username: string, email: string, password: string) {
    if (username === 'utilisateur' && email === 'email' && password === 'motdepasse') {
      AuthService.isLoggedIn = true;
      return true;
    }
    throw new Error('Method not implemented.');
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
