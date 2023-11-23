import {Component} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'AngularCommerceApp';

  adminItems: MenuItem[] | undefined;
  userItems: MenuItem[] | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.adminItems = [
      {label: 'Users', routerLink: '/admin/users'},
    ];

    this.userItems = [
      {label: 'Products', routerLink: '/products'},
      {label: 'Basket', routerLink: '/basket'},
      {label: 'Orders', routerLink: '/orders'},
      {label: 'Addresses', routerLink: '/addresses'},
    ];
  }

  onLogoutButtonClicked() {
    window.sessionStorage.removeItem("TOKEN_KEY");
    this.router.navigate(["login"]);
  }

  isHeaderVisible(): boolean {
    return window.sessionStorage.getItem("TOKEN_KEY") != null;
  }

  get items(): MenuItem[] | undefined {
    return this.userService.getUserRole() == "Admin" ? this.adminItems : this.userItems;
  }
}
