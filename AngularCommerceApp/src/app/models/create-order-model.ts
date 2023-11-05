import {CreateOrderItemModel} from "./create-order-item-model";

export class CreateOrderModel {
    addressID: number;
    items: CreateOrderItemModel[];

    constructor(addressID: number, items: CreateOrderItemModel[]) {
        this.addressID = addressID;
        this.items = items;
    }
}
