import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../services/auth.services';
import { AxiosService } from '../services/axios.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  authService: AuthService = new AuthService();

  constructor(private router: Router, private axiosService: AxiosService) {}

  onSubmit(): void {
    let loginData = { username: this.username, password: this.password };
    axios
      .post(`http://localhost:3000/auth/login`, loginData)
      .then((response) => {
        // Handle successful login response
        console.log(response.data);
        if (response.data.msg) this.router.navigate(['/home']);
        
        const loginSuccessful = this.authService.login(response.data.msg);
        // Store the token in the local storage
        localStorage.setItem('token', response.data.token);
        return response.data.msg;
      })
      .catch((error) => {
        // Handle login error
        console.error(error.response.data);
      });
    /* this.axiosService.login(this.username, this.password)
      .then(response => {
        // Handle successful login response
        //console.log('Login successful', response);
      })
      .catch(error => {
        // Handle login error
        console.error('Login error', error);
      });*/
  }

  /*onSubmit(): void {
    const loginSuccessful = this.authService.login(
      this.username,
      this.password
    );

    if (loginSuccessful) {
      console.log('Connexion réussie');
      // Utilisez le service de routage pour rediriger l'utilisateur
      this.router.navigate(['/home']); // Remplacez '/accueil' par le chemin de votre page d'accueil
    } else {
      console.log('Échec de la connexion');
      // Affichez un message d'erreur à l'utilisateur si nécessaire
    }
  }*/
}
