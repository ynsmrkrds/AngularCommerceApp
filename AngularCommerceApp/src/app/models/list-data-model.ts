export class ListDataModel<T> {
    list: T[];
    totalCount: number;

    constructor(list: T[], totalCount: number) {
        this.list = list;
        this.totalCount = totalCount;
    }
}
