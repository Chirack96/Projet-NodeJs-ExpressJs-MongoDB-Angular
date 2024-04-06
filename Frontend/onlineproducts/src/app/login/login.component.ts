import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.services';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzCheckboxModule, NzButtonModule, RouterModule, NzNotificationModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    @Inject(Router) private router: Router, 
    private authService: AuthService,
    private axiosService: AxiosService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    if (AuthService.isLoggedIn) {
      this.router.navigate(['/home']);
    }

    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      const { username, password } = this.validateForm.value;
      const loginData = { username, password };
      
      axios.post(`http://localhost:3000/auth/login`, loginData)
        .then(response => {
          console.log(response);
          console.log(response.data);
          if (response.data.msg) {
            this.notification.create('success', 'Login Successful', `Welcome back ${username}!`);
            this.authService.login(response.data.token, response.data.isAdmin, username);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isAdmin', response.data.isAdmin);
            localStorage.setItem('username', username);
            this.router.navigate(['/home']);

          }
        })
        .catch(error => {
          this.notification.create('error', 'Login Failed', 'Invalid username or password');
          console.error(error.response.data);
        });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
