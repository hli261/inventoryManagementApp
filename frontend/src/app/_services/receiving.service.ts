import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReceiveOrder, RoItem, Ship, ShipCreate, ShipMethod } from '../_models';
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

   public getShipByNum(num: string): Observable<Ship> {
    return this.http.get<Ship> (`${environment.apiUrl}/api/shipping/getShipping/${num}`);
  }

  public updateShip(num: string, ship: ShipCreate): Observable<ShipCreate> {
    return this.http.put<ShipCreate> (`${environment.apiUrl}/api/shipping/update/${num}`, ship);
  }

  getAllRO() : Observable<ReceiveOrder[]>{
    return this.http.get<ReceiveOrder[]>(`${environment.apiUrl}/api/Receiving/getAll`);    
  }

  public createRO(PONumber:any, venderNo:any, shippingNumber:any) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Receiving/createROHeader?PONumber=${PONumber}&venderNo=${venderNo}&shippingNumber=${shippingNumber}`);    
  }

  public updateROItems(roNumber:string, roItems: RoItem[] ) : Observable<RoItem[]> {
    return this.http.put<RoItem[]>(`${environment.apiUrl}/api/Receiving/update/${roNumber}`, roItems);
  }

  public getROItemsByRONum(roNumber:string) : Observable<RoItem[]> {
    console.log("start get Roitems......")
    return this.http.get<RoItem[]>(`${environment.apiUrl}/api/Receiving/receivingItemsByRO/${roNumber}`);
  }

  public getROByRONum(roNumber:string) : Observable<ReceiveOrder> {
    console.log("start get Ro......")
    return this.http.get<ReceiveOrder>(`${environment.apiUrl}/api/Receiving/receivingByRO/${roNumber}`);
  }

  public submitRO(ro: ReceiveOrder) : Observable<ReceiveOrder> {
    return this.http.post<ReceiveOrder>(`${environment.apiUrl}/api/Receiving/createreceiving`, ro);
  }


 

}
