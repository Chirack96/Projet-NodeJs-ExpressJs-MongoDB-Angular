import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.services';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, RouterModule, NzCheckboxModule, RouterModule, NzButtonModule,FormsModule, NzNotificationModule],
})
export class InscriptionComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(Router) private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      const { username, password, email } = this.validateForm.value;
      const registrationData = { username, password, email };

      axios.post('http://localhost:3000/auth/signup', registrationData)
        .then((response) => {
          console.log(response.data);
          if (response.data.msg) {
            this.notification.create('success', 'Registration Successful', `Welcome ${username}! Please login to continue.`);
            this.router.navigate(['/login']);
          }
          const registrationSuccess = this.authService.register(response.data.msg);
        return response.data.msg;
        })
        .catch((error) => {
          this.notification.create('error', 'Registration Failed', 'Invalid username or password');
          console.error(error.response.data);
        });
    }
  }
}
