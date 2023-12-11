import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  authService: AuthService = new AuthService();

  constructor(private router: Router) {}
  onSubmit(): void {
    const registrationSuccess = this.authService.register(
      this.username,
      this.email,
      this.password
    );

    // Ajoutez ici la logique d'inscription
    console.log(
      `Inscription avec ${this.username}, ${this.email} et ${this.password}`
    );

    if (registrationSuccess !== undefined && registrationSuccess !== null) {
      console.log('Inscription réussie');
      this.router.navigate(['/home']);
    } else {
      console.log("Échec de l'inscription");
      // Gérer l'échec de l'inscription, par exemple, afficher un message d'erreur
    }
  }
}
