import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
@Component({
  selector: 'app-payement-page',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzSelectModule, NzButtonModule, ReactiveFormsModule, NzModalModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss'
})
export class PayementPageComponent {
  deliveryForm!: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NzModalService) {}

  ngOnInit(): void {
  this.initForm();
  this.deliveryForm.valueChanges.subscribe(values => {
    localStorage.setItem('deliveryFormData', JSON.stringify(values));
  });

  // Tenter de récupérer les données lors de l'initialisation du composant
  const savedData = localStorage.getItem('deliveryFormData');
  if (savedData) {
    this.deliveryForm.setValue(JSON.parse(savedData));
  }
}

initForm(): void {
  this.deliveryForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    address: this.fb.group({
      street: [null, [Validators.required]],
      city: [null, [Validators.required]],
      postalCode: [null, [Validators.required]]
    }),
    paymentMethod: [null, [Validators.required]]
  });
}

  onSubmit(): void {
    this.showPaymentModal();

}

showPaymentModal(): void {
  const paymentMethod = this.deliveryForm.get('paymentMethod')?.value;

  let modalContent = '';
  switch (paymentMethod) {
    case 'card':
      modalContent = 'Veuillez saisir les détails de votre carte bancaire.';
      break;
    case 'transfer':
      modalContent = 'Veuillez saisir les détails de votre virement.';
      break;
    case 'check':
      modalContent = 'Instructions pour le paiement par chèque.';
      break;
    default:
      modalContent = 'Veuillez choisir un mode de paiement.';
  }

  this.modalService.create({
    nzTitle: 'Détails du paiement',
    nzContent: modalContent,
    nzFooter: [
      {
        label: 'Valider le paiement',
        type: 'primary',
        onClick: () => this.processPayment()
      }
    ]
  });
}

processPayment(): void {
  console.log('Traitement du paiement...');
  // Ici, vous mettez en œuvre la logique de traitement du paiement.
  // Par exemple, envoyer les données à votre serveur ou à une API de paiement externe
}
}
