export class CreateAddressModel {
    title: string;
    city: string;
    district: string;
    street: string;
    address: string;

    constructor(title: string, city: string, district: string, street: string, address: string) {
        this.title = title;
        this.city = city;
        this.district = district;
        this.street = street;
        this.address = address;
    }
}
