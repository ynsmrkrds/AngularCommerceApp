import {BaseModel} from "./base-model";

export class ProductModel extends BaseModel {
    name: string;
    description: string;
    price: number;
    imageUrl: string;

    constructor(id: number, createdDate: Date, name: string, description: string, price: number, imageUrl: string) {
        super(id, createdDate);
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
