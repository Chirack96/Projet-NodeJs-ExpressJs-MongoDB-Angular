import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../services/auth.services';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  authService: AuthService = new AuthService();

  constructor(private router: Router, private axios: AxiosService ) {}

  onSubmit(): void {
    const registrationData = {
      username: this.username,
      password: this.password,
    };

    axios.post('http://localhost:3000/auth/signup', registrationData)
      .then((response) => {
        console.log(response.data);
        if (response.data.msg) {
          this.router.navigate(['/login']);
        }
        const registrationSuccess = this.authService.register(response.data.msg);
        return response.data.msg;
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }
}



