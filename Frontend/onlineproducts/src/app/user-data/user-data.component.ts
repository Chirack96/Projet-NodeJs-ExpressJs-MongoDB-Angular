import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzInputModule, NzButtonModule, FormsModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent implements OnInit {
  userDetails: any;
  loadingError = false;
  editingField: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.authService.getUserDetails().then(userDetails => {
      this.userDetails = userDetails;
      this.loadingError = false;
    }).catch(error => {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      this.loadingError = true;
    });
  }

  supprimer(champ: string) {
    console.log(`Supprimer ${champ}`);
  }

  mettreAJour() {
    console.log('Mettre à jour les informations');
  }
  startEditing(field: string) {
    this.editingField = field;
  }

  stopEditing() {
    this.editingField = null;
  }
}
