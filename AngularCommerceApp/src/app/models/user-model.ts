import {BaseModel} from "./base-model";

export class UserModel extends BaseModel {
    name: string;
    surname: string;
    email: string;

    constructor(id: number, createdDate: Date, name: string, surname: string, email: string) {
        super(id, createdDate);
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}
