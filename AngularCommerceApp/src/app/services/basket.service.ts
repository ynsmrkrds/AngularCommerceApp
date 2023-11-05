import {Injectable} from '@angular/core';
import {BasketItemModel} from '../models/basket-item-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket: BasketItemModel[] = [];

  constructor() { }

  addToBasket(orderItem: BasketItemModel) {
    const existingOrderItem = this.basket.find((item) => item.productId === orderItem.productId);

    if (existingOrderItem) {
      existingOrderItem.quantity++;
    } else {
      this.basket.push(orderItem);
    }
  }

  removeFromBasket(orderItem: BasketItemModel) {
    const index = this.basket.indexOf(orderItem);
    if (index !== -1) {
      this.basket.splice(index, 1);
    }
  }

  getBasket(): BasketItemModel[] {
    return this.basket;
  }
}
