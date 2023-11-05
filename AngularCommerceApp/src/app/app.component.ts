import {Component} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'AngularCommerceApp';

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      {label: 'Products', routerLink: '/products'},
      {label: 'Basket', routerLink: '/basket'},
      {label: 'Orders', routerLink: '/orders'},
      {label: 'Addresses', routerLink: '/addresses'}
    ];

    this.activeItem = this.items[0];
  }

  isHeaderVisible(): boolean {
    return window.sessionStorage.getItem("TOKEN_KEY") != null;
  }
}
