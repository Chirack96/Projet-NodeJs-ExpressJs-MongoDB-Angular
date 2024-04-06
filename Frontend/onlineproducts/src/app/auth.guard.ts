import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.services'; // Assurez-vous d'ajuster le chemin d'importation selon votre structure

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresAdmin = route.data['requiresAdmin'] || false;
    
    // Vérifiez si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    
    // Si la route nécessite un administrateur, vérifiez si l'utilisateur est un administrateur
    if (requiresAdmin && !AuthService.isAdmin) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    
    return true;
  }
}