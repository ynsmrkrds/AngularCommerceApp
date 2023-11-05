import {AddressModel} from "./address-model";
import {BaseModel} from "./base-model";
import {OrderItemModel} from "./order-item-model";

export class OrderModel extends BaseModel {
    address: AddressModel;
    items: OrderItemModel[];
    totalPrice: number;

    constructor(id: number, createdDate: Date, address: AddressModel, items: OrderItemModel[], totalPrice: number) {
        super(id, createdDate);
        this.address = address;
        this.items = items;
        this.totalPrice = totalPrice;
    }
}
