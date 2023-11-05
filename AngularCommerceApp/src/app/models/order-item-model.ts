import {BaseModel} from "./base-model";
import {ProductModel} from "./product-model";

export class OrderItemModel extends BaseModel {
    product: ProductModel;
    quantity: number;

    constructor(id: number, createdDate: Date, product: ProductModel, quantity: number) {
        super(id, createdDate);
        this.product = product;
        this.quantity = quantity;
    }
}
