import {Component} from '@angular/core';
import {MessageService} from 'primeng/api';
import {BasketItemModel} from 'src/app/models/basket-item-model';
import {ListDataModel} from 'src/app/models/list-data-model';
import {ProductModel} from 'src/app/models/product-model';
import {BasketService} from 'src/app/services/basket.service';
import {ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productsData!: ListDataModel<ProductModel>;
  size: number = 10;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private basketService: BasketService,
  ) {
  }

  ngOnInit() {
    this.getProducts();
  }

  onPageChange(event: any) {
    this.size = event.rows;
    this.getProducts(event.page);
  }

  onAddToBasketButtonClicked(productId: number) {
    this.basketService.addToBasket(new BasketItemModel(productId, 1));
  }


  private getProducts(page: number = 0) {
    this.productService.getProducts(page, this.size).subscribe({
      next: (v) => {
        console.log(v);
        if (v.data != null) {
          this.productsData = v.data;
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
