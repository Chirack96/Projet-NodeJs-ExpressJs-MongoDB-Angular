import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-final-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzNotificationModule, NzCardModule],
  templateUrl: './final-reset-password.component.html',
  styleUrl: './final-reset-password.component.scss'
})
export class FinalResetPasswordComponent implements OnInit{
resetForm!: FormGroup;
token!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
this.token = this.route.snapshot.queryParams['token'];

this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit(): void {
    this.token =   this.route.snapshot.paramMap.get('token') ||''
    console.log(this.token);
    
    if (this.resetForm.valid && this.token) {
      axios.post(`http://localhost:3000/auth/reset/${this.token}`,this.resetForm.value)
        .then(response => {
          console.log(response);
          this.notification.create(
            'success',
            'Réinitialisation Réussie',
            'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.'
          );
          this.router.navigate(['/login']);
        })
        .catch(error => {
          this.notification.create(
            'error',
            'Erreur de Réinitialisation',
            'Une erreur s\'est produite lors de la réinitialisation de votre mot de passe. Veuillez réessayer.'
          );
        });
    }
    else{
      console.log('Invalid form');
    }
  }

}