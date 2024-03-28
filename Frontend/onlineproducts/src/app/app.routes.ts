import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdminPannelComponent } from './adminpannel/adminpannel.component';
import { AsideComponent } from './aside/aside.component';
import { FinalResetPasswordComponent } from './final-reset-password/final-reset-password.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { PanierComponent } from './panier/panier.component';
import { PayementPageComponent } from './payment-page/payment-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



export const appRoutes: Routes = [
        { path: 'login', component: LoginComponent },
        { path: 'inscription', component: InscriptionComponent },
        { path: '', component: ProductListComponent },
        { path: 'home', component: ProductListComponent },
        { path: 'panier', component: PanierComponent },
        { path: 'addproduct', component: AddproductComponent },
        { path: 'reset', component: ResetPasswordComponent },
        { path: 'adminpannel', component: AdminPannelComponent },
        { path: 'product/:id', component: ProductComponent },
        { path: 'finalresetpassword/:token', component: FinalResetPasswordComponent },
        { path: 'payment', component: PayementPageComponent }
        

];



@NgModule({
    imports: [RouterModule.forRoot(appRoutes), ProductListComponent, ProductComponent, AsideComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {}
