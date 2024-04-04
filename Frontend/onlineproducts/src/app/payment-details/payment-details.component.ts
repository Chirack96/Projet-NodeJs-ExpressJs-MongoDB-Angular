import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
// NzSelectModule n'est plus nécessaire, donc vous pouvez le retirer.
// import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, NzLayoutModule, NzFormModule, NzInputModule, /* NzSelectModule, */ NzButtonModule, NzModalModule],
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss'] // Correction de 'styleUrl' en 'styleUrls'
})
export class PaymentDetailsComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.initForm();
  }

  ngOnInit(): void {
    // L'initialisation du formulaire a été déplacée dans le constructeur pour garantir qu'elle est faite avant tout autre cycle de vie
  }

  initForm(): FormGroup {
    return this.fb.group({
      paymentMethod: [null, Validators.required],
      // Champs pour le paiement par carte
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      // Champs pour le paiement par chèque
      checkNumber: [''],
      amount: [''],
      // Champs pour le paiement par virement
      beneficiaryName: [''],
      accountNumber: ['']
    });
  }

  selectPaymentMethod(method: string): void {
    this.paymentForm.get('paymentMethod')?.setValue(method);
  }

  isSelected(method: string): boolean {
    return this.paymentForm.get('paymentMethod')?.value === method;
  }

  onSubmit(): void {
    console.log('Payment Data:', this.paymentForm.value);
    // Traiter les données de paiement ici
  }

}
