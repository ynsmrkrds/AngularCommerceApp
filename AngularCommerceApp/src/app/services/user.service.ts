import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.development';
import {RegisterRequestModel} from '../models/register-request-model';
import {LoginRequestModel} from '../models/login-request-model';
import {ApiResponseModel} from '../models/api-response-model';
import {Observable} from 'rxjs';
import {LoginResponseModel} from '../models/login-response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(model: RegisterRequestModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(`${environment.baseUrl}/${environment.register}`, model);
  }

  login(model: LoginRequestModel): Observable<ApiResponseModel<LoginResponseModel>> {
    return this.http.post<ApiResponseModel<LoginResponseModel>>(`${environment.baseUrl}/${environment.login}`, model);
  }
}
