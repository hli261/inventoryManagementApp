import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReceivingCreate } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

  constructor(private http: HttpClient) { 
  }

  getCreate(PONumber:any, venderNo:any, shippingNumber:any){
    return this.http.get<ReceivingCreate>(`${environment.apiUrl}/api/Receiving/receivingOrder?PONumber=${PONumber}&venderNo=${venderNo}&shippingNumber=${shippingNumber}`);
    
  }
 
  getShippingMethod(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/Vender/shippingMethods`);
  }

  get(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/Vender/shippingMethods`);
  }

}
