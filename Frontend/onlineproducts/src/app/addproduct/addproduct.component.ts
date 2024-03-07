import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../services/auth.services';
import { ProductsService } from '../services/product.services';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzNotificationModule],
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  validateForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(@Inject(Router) private router: Router, private fb: FormBuilder, private productsService: ProductsService, private authService: AuthService, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
      return;
    }
    this.notification.create('success', 'Product Added', 'Your product has been added successfully');

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    Object.keys(this.validateForm.value).forEach(key => {
      formData.append(key, this.validateForm.value[key]);
    });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Erreur lors de la récupération du token:', token);
        return;
      }
      const response = await axios.post('http://localhost:3000/storeProduct', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      this.validateForm.reset();
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données au backend:', error);
    }
  }
}
