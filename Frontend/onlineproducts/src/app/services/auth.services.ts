import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register(username: string, password: string) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn: boolean = false;

  login(username: string, password: string): boolean {
    if (username === 'utilisateur' && password === 'motdepasse') {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }
  signup(username: string, password: string): boolean {
    if (username === 'utilisateur' && password === 'motdepasse') {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }
}
