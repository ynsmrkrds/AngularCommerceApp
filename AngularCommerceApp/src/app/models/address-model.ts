import {BaseModel} from "./base-model";

export class AddressModel extends BaseModel {
    title: string;
    city: string;
    district: string;
    street: string;
    address: string;

    constructor(id: number, createdDate: Date, title: string, city: string, district: string, street: string, address: string) {
        super(id, createdDate);
        this.title = title;
        this.city = city;
        this.district = district;
        this.street = street;
        this.address = address;
    }
}
