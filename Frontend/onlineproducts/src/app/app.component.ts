import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, ProductListComponent]
})
export class AppComponent {
  ngOnInit(): void {

}
}
