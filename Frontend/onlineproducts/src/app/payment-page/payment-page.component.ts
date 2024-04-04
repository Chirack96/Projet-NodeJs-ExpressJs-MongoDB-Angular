import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
@Component({
  selector: 'app-payement-page',
  standalone: true,
  imports: [NzFormModule, NzInputModule, NzSelectModule, NzButtonModule, ReactiveFormsModule, NzModalModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss'
})
export class PaymentPageComponent {
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
    const modal = this.modalService.create({
        nzTitle: 'Effectuer un Paiement',
        nzContent: PaymentDetailsComponent,
        nzFooter: null, // Pas de footer nécessaire car le composant de formulaire gère déjà la soumission
        nzWidth: '50%', // ou vous pouvez utiliser une valeur spécifique en px
        nzCentered: true, // Pour centrer le modal verticalement
      // Pour un contrôle plus fin, y compris la hauteur, utilisez nzBodyStyle ou un CSS custom dans votre composant
      nzBodyStyle: {
        maxHeight: '80vh', // Exemple pour contrôler la hauteur maximale
        overflowY: 'auto', // Permettre le défilement si le contenu dépasse

      },
  });
  

    // Optionnel: gérer la fermeture du modal ou les données retournées
    modal.afterClose.subscribe(result => {
      console.log('Modal closed', result);
      // Traiter les données de paiement ou la fermeture ici si nécessaire
    });
  }
}
