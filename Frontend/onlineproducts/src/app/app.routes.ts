import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdminPannelComponent } from './adminpannel/adminpannel.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { PanierComponent } from './panier/panier.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



export const appRoutes: Routes = [
        { path: 'login', component: LoginComponent },
        { path: 'inscription', component: InscriptionComponent },
        { path: 'home', component: ProductListComponent },
         { path: '', component: ProductListComponent },
        { path: 'panier', component: PanierComponent },
        { path: 'addproduct', component: AddproductComponent },
        { path: 'reset', component: ResetPasswordComponent },
        { path: 'adminpannel', component: AdminPannelComponent },
        { path: 'product/:id', component: ProductComponent }
        

];



@NgModule({
    imports: [RouterModule.forRoot(appRoutes), ProductListComponent, ProductComponent],
    exports: [RouterModule]
})
export class AppRoutingModule {}
