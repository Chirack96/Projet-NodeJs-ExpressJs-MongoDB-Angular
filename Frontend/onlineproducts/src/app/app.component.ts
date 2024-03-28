import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, Event as RouterEvent, RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { filter } from 'rxjs/operators';
import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthService } from './services/auth.services';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    ProductListComponent,
    HeaderComponent,
    FormsModule,
    RouterModule,
    NzLayoutModule,
    AsideComponent,
    NzBreadCrumbModule
  ],
})
export class AppComponent implements OnInit {
  showAside = true;
  AuthService = new AuthService();
 isLoggedIn(): boolean {
        return AuthService.isLoggedIn;
    }
  constructor(private router: Router) {}

 ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showAside = !(event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/inscription');
    });
  }
}
