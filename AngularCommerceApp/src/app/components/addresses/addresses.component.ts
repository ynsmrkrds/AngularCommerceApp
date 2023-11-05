import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AddressModel} from 'src/app/models/address-model';
import {ListDataModel} from 'src/app/models/list-data-model';
import {AddressService} from 'src/app/services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent {
  addressesData!: ListDataModel<AddressModel>;
  size: number = 10;

  constructor(
    private addressService: AddressService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getAddresses();
  }

  onPageChange(event: any) {
    this.size = event.rows;
    this.getAddresses(event.page);
  }

  onCreateButtonClicked() {
    this.router.navigate(["address/create"]);
  }

  private getAddresses(page: number = 0) {
    this.addressService.getAddresses(page, this.size).subscribe({
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
