import {BaseModel} from "./base-model";

export class UserModel {
    id: string;
    name: string;
    surname: string;
    email: string;
    isActive: boolean;

    constructor(id: string, name: string, surname: string, email: string, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.isActive = isActive;
    }
}
