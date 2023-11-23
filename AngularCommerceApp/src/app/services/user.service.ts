import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.development';
import {RegisterRequestModel} from '../models/register-request-model';
import {LoginRequestModel} from '../models/login-request-model';
import {ApiResponseModel} from '../models/api-response-model';
import {Observable} from 'rxjs';
import {LoginResponseModel} from '../models/login-response-model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserModel} from '../models/user-model';
import {ListDataModel} from '../models/list-data-model';
import {ChangeUserStatusRequestModel} from '../models/change-user-status-request-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  register(model: RegisterRequestModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(`${environment.baseUrl}/${environment.register}`, model);
  }

  login(model: LoginRequestModel): Observable<ApiResponseModel<LoginResponseModel>> {
    return this.http.post<ApiResponseModel<LoginResponseModel>>(`${environment.baseUrl}/${environment.login}`, model);
  }

  getUsers(page: number, size: number): Observable<ApiResponseModel<ListDataModel<UserModel>>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.get<ApiResponseModel<ListDataModel<UserModel>>>(`${environment.baseUrl}/${environment.user}/${page}/${size}`, {headers: headers});
  }

  changeUserStatus(requestModel: ChangeUserStatusRequestModel): Observable<ApiResponseModel> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.put<ApiResponseModel>(`${environment.baseUrl}/${environment.changeUserStatus}`, requestModel, {headers: headers});
  }

  isAuthenticated(): boolean {
    const token = window.sessionStorage.getItem("TOKEN_KEY");
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserRole(): string | null {
    const token = window.sessionStorage.getItem("TOKEN_KEY");
    if (token == null) return null;

    const decodedToken = this.jwtHelper.decodeToken(token!);

    console.log(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

    return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }
}
