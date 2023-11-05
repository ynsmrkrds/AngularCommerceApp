import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ListDataModel} from 'src/app/models/list-data-model';
import {OrderModel} from 'src/app/models/order-model';
import {OrderService} from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  ordersData!: ListDataModel<OrderModel>;
  size: number = 10;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  onPageChange(event: any) {
    this.size = event.rows;
    this.getOrders(event.page);
  }

  private getOrders(page: number = 0) {
    this.orderService.getOrders(page, this.size).subscribe({
      next: (v) => {
        if (v.data != null) {
          this.ordersData = v.data;
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
