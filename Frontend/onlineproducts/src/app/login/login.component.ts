import { Component, Inject } from '@angular/core';
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

  constructor(@Inject(Router) private router: Router, private axiosService: AxiosService) {}

  onSubmit(): void {
    let loginData = { username: this.username, password: this.password };
    axios
      .post(`http://localhost:3000/auth/login`, loginData)
      .then((response) => {
        console.log(response.data);
        if (response.data.msg) this.router.navigate(['/home']);
      
        
        const loginSuccessful = this.authService.login(response.data.msg);
        localStorage.setItem('token', response.data.token);
        return response.data.msg;
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }
}
