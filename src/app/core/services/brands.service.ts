import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  token: string = typeof window !== 'undefined' && localStorage.getItem('token')
  ? localStorage.getItem('token')!
  : '';

  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });
  
  constructor(private _http: HttpClient) { }

  getBrands() {
    return this._http.get<any[]>(environment.Back_server + '/brands', { headers: this.headers });
  }

  getOneBrandById(id: any) {
    return this._http.get(`${environment.Back_server}/brands/${id}`, { headers: this.headers});
  }

  createBrand(brand: any): Observable<any> {
    return this._http.post(environment.Back_server + '/brands', brand, { headers: this.headers });
  }

  editBrand(brand: any, id: number) {
    return this._http.patch(environment.Back_server + '', brand, { headers: this.headers});
  }

  deleteBrand(id: any) {
    return this._http.delete(`${environment.Back_server}/brands/${id}`, { headers: this.headers });
  }
}
