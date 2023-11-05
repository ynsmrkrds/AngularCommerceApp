import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {CreateAddressModel} from 'src/app/models/create-address-model';
import {AddressService} from 'src/app/services/address.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent {
  addressForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    district: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  get title() {
    return this.addressForm.controls['title'];
  }

  get city() {
    return this.addressForm.controls['city'];
  }

  get district() {
    return this.addressForm.controls['district'];
  }

  get street() {
    return this.addressForm.controls['street'];
  }

  get address() {
    return this.addressForm.controls['address'];
  }

  create() {
    let model = new CreateAddressModel(
      this.title.value!,
      this.city.value!,
      this.district.value!,
      this.street.value!,
      this.address.value!);

    this.addressService.createAddress(model).subscribe({
      next: (v) => {
        if (v.response != null) {
          this.messageService.add({
            severity: v.response!.isSuccessful ? "success" : "warn",
            detail: v.response!.message
          });

          if (v.response!.isSuccessful) {
            this.router.navigate(["addresses"]);
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
}
