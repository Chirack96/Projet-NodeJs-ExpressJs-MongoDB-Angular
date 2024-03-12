import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzNotificationModule, NzCardModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
  export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    console.log(this.resetForm.value);
    if (this.resetForm.valid) {
      axios.post('http://localhost:3000/auth/request-reset-password', this.resetForm.value)
        .then(response => {
          this.notification.create(
            'success',
            'Demande de Réinitialisation Envoyée',
            'Un email de réinitialisation de mot de passe a été envoyé si l\'adresse est associée à un compte.'
          );
          this.router.navigate(['/login']);
        })
        .catch(error => {
          this.notification.create(
            'error',
            'Erreur de Demande de Réinitialisation',
            error.response.data.error || 'Une erreur est survenue, veuillez réessayer.'
          );
        });
    }
  }
}