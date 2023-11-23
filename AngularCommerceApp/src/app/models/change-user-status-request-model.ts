export class ChangeUserStatusRequestModel {
    userId: string;
    isActive: boolean;

    constructor(userId: string, isActive: boolean) {
        this.userId = userId;
        this.isActive = isActive;
    }
}
