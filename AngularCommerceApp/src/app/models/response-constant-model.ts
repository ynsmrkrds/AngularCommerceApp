export class ResponseConstantModel {
    isSuccessful: boolean;
    message: string;

    constructor(isSuccessful: boolean, message: string) {
        this.isSuccessful = isSuccessful;
        this.message = message;
    }
}
