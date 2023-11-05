import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {BasketItemModel} from 'src/app/models/basket-item-model';
import {ProductModel} from 'src/app/models/product-model';
import {BasketService} from 'src/app/services/basket.service';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  basket: BasketItemModel[];
  basketProducts: ProductModel[] = [];

  constructor(
    private basketService: BasketService,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.basket = basketService.getBasket();
  }

  ngOnInit() {
    this.getBasketProducts();
  }

  removeItem(orderItem: BasketItemModel) {
    this.basketService.removeFromBasket(orderItem);
    this.basket = this.basketService.getBasket();
  }

  getProductById(id: number): ProductModel {
    return this.basketProducts.find(x => x.id == id)!;
  }

  onDoneButtonClicked() {
    this.router.navigate(["checkout"]);
  }

  get totalPrice(): number {
    let totalPrice = 0;

    if (this.basket && this.basket.length > 0) {
      for (const basketItem of this.basket) {
        const product = this.getProductById(basketItem.productId);
        totalPrice += product.price * basketItem.quantity;
      }
    }

    return totalPrice;
  }

  private getBasketProducts() {
    this.basket.forEach((item, index) => {
      this.productService.getProductById(item.productId).subscribe({
        next: (v) => {
          console.log(v);
          if (v.data != null) {
            this.basketProducts.push(v.data);
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
    });
  }
}
