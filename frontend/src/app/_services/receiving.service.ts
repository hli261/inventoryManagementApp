import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

  constructor(private http: HttpClient) { 
  }



  getShippingMethod(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/Vender/shippingMethods`);
  }

  get(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/Vender/shippingMethods`);
  }

}
