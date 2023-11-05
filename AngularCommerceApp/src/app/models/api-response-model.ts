import {ExceptionConstantModel} from "./exception-constant-model";
import {ResponseConstantModel} from "./response-constant-model";

export class ApiResponseModel<T = null> {
    data: T | null;
    response: ResponseConstantModel | null;
    errors: ExceptionConstantModel[] | null;

    constructor(data: T | null, response: ResponseConstantModel | null, errors: ExceptionConstantModel[] | null) {
        this.data = data;
        this.response = response;
        this.errors = errors;
    }
}
