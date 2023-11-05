export class BaseModel {
    id: number;
    createdDate: Date;

    constructor(id: number, createdDate: Date) {
        this.id = id;
        this.createdDate = createdDate;
    }
}
