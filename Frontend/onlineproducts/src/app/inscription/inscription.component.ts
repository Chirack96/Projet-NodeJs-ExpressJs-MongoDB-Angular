import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
   username: string = '';
  email: string = '';
  password: string = '';

  onSubmit(): void {
    // Ajoutez ici la logique d'inscription
    console.log(`Inscription avec ${this.username}, ${this.email} et ${this.password}`);
  }

}
