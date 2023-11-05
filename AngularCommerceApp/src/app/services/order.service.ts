import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CreateOrderModel} from '../models/create-order-model';
import {ApiResponseModel} from '../models/api-response-model';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';
import {OrderModel} from '../models/order-model';
import {ListDataModel} from '../models/list-data-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  getOrders(page: number, size: number): Observable<ApiResponseModel<ListDataModel<OrderModel>>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.get<ApiResponseModel<ListDataModel<OrderModel>>>(`${environment.baseUrl}/${environment.order}/${page}/${size}`, {headers: headers});
  }

  createOrder(model: CreateOrderModel): Observable<ApiResponseModel> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.post<ApiResponseModel>(`${environment.baseUrl}/${environment.order}`, model, {headers: headers});
  }
}
