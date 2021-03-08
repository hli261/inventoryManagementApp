import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ship, ShipCreate, ShipMethod } from '../_models';
import { take } from 'rxjs/operators';
import { ReceivingCreate } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

  constructor(private http: HttpClient) { 
  }

  public getShippingMethod(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/api/Vender/shippingMethods`).pipe(
      take(5)      
    );
  }

  public getShips(): Observable<Ship[]> {
    return this.http.get<Ship[]> (`${environment.apiUrl}/api/shipping`);
  }

  public addShip(ship: ShipCreate): Observable<Ship>{
    //  return this.http.post(`${environment.apiUrl}/api/Shipping/createShipping`, ship).subscribe();
     return this.http.post<Ship>(`${environment.apiUrl}/api/Shipping/createShipping`, ship);
   }

   public addShipMethod(type: ShipMethod){
    // return this.http.post(`${environment.apiUrl}/api/Vender/createShippingMethod`, type).subscribe();
    return this.http.post(`${environment.apiUrl}/api/Vender/createShippingMethod`, type);
   }

  getCreate(PONumber:any, venderNo:any, shippingNumber:any){
    return this.http.get<ReceivingCreate>(`${environment.apiUrl}/api/Receiving/receivingOrder?PONumber=${PONumber}&venderNo=${venderNo}&shippingNumber=${shippingNumber}`);
    
  }

   public getShipByNum(num: string): Observable<Ship> {
    return this.http.get<Ship> (`${environment.apiUrl}/api/shipping/getShipping/${num}`);
  }

  public updateShip(num: string, ship: ShipCreate): Observable<ShipCreate> {
    return this.http.put<ShipCreate> (`${environment.apiUrl}/api/shipping/update/${num}`, ship);
  }

 

}
