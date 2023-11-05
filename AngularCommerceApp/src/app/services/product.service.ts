import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiResponseModel} from '../models/api-response-model';
import {ListDataModel} from '../models/list-data-model';
import {ProductModel} from '../models/product-model';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number): Observable<ApiResponseModel<ListDataModel<ProductModel>>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.get<ApiResponseModel<ListDataModel<ProductModel>>>(`${environment.baseUrl}/${environment.product}/${page}/${size}`, {headers: headers});
  }

  getProductById(id: number): Observable<ApiResponseModel<ProductModel>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${window.sessionStorage.getItem("TOKEN_KEY")}`
    });

    return this.http.get<ApiResponseModel<ProductModel>>(`${environment.baseUrl}/${environment.product}/${id}`, {headers: headers});
  }
}
