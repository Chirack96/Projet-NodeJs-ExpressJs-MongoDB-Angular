import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';


export const appRoutes: Routes = [
        { path: 'login', component: LoginComponent },
        { path: 'inscription', component: InscriptionComponent },
        { path: 'home', component: ProductListComponent },
         { path: '', component: ProductListComponent }

];



@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
