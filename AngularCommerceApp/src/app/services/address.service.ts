import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AddressModel} from '../models/address-model';
import {environment} from 'src/environments/environment.development';
import {ApiResponseModel} from '../models/api-response-model';
import {Observable} from 'rxjs';
import {CreateAddressModel} from '../models/create-address-model';
import {ListDataModel} from '../models/list-data-model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }

  getAddresses(page: number, size: number): Observable<ApiResponseModel<ListDataModel<AddressModel>>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.get<ApiResponseModel<ListDataModel<AddressModel>>>(`${environment.baseUrl}/${environment.address}/${page}/${size}`, {headers: headers});
  }

  createAddress(model: CreateAddressModel): Observable<ApiResponseModel> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.post<ApiResponseModel>(`${environment.baseUrl}/${environment.address}`, model, {headers: headers});
  }
}
