import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AddressModel} from 'src/app/models/address-model';
import {CreateOrderItemModel} from 'src/app/models/create-order-item-model';
import {CreateOrderModel} from 'src/app/models/create-order-model';
import {ListDataModel} from 'src/app/models/list-data-model';
import {AddressService} from 'src/app/services/address.service';
import {BasketService} from 'src/app/services/basket.service';
import {OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  addressesData!: ListDataModel<AddressModel>;
  selectedAddress: AddressModel | undefined;

  constructor(
    private addressService: AddressService,
    private basketService: BasketService,
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAddresses();
  }

  onDoneButtonClicked() {
    this.createOrder();
  }

  private createOrder() {
    let items: CreateOrderItemModel[] = [];

    this.basketService.getBasket().forEach((item, index) => {
      items.push(new CreateOrderItemModel(item.productId, item.quantity));
    });

    let model = new CreateOrderModel(
      this.selectedAddress!.id, items);

    this.orderService.createOrder(model).subscribe({
      next: (v) => {
        if (v.response != null) {
          this.messageService.add({
            severity: v.response!.isSuccessful ? "success" : "warn",
            detail: v.response!.message
          });

          if (v.response!.isSuccessful) {
            this.basketService.clearBasket();
            this.router.navigate(["products"]);
          }
        } else if (v.errors != null) {
          this.messageService.add({
            severity: "error",
            detail: `${v.errors.join('\n')}`
          });
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: "error",
          detail: "Something went wrong"
        });
      }
    });
  }

  private getAddresses() {
    this.addressService.getAddresses(0, 1000).subscribe({
      next: (v) => {
        if (v.data != null) {
          this.addressesData = v.data;
        } else if (v.errors != null) {
          this.messageService.add({
            severity: "error",
            detail: `${v.errors.join('\n')}`
          });
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: "error",
          detail: "Something went wrong"
        });

        console.info(e);
      }
    });
  }
}
