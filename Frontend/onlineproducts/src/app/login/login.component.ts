import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

        @Component({
            selector: 'app-login',
            standalone: true,
            imports: [FormsModule],
            templateUrl: './login.component.html',
            styleUrl: './login.component.scss'
        })
        export class LoginComponent {
            username: string = '';
            password: string = '';
          authService: any;

            
            constructor(private router: Router) {}

onSubmit(): void {
  const loginSuccessful = this.authService.login(this.username, this.password);

  if (loginSuccessful) {
    console.log('Connexion réussie');
    // Utilisez le service de routage pour rediriger l'utilisateur
    this.router.navigate(['/accueil']); // Remplacez '/accueil' par le chemin de votre page d'accueil
  } else {
    console.log('Échec de la connexion');
    // Affichez un message d'erreur à l'utilisateur si nécessaire
  }
}

        }