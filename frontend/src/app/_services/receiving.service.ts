import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReceiveOrder, RoItem, Ship, ShipCreate, ShipMethod, Vender } from '../_models';
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

  public createRO(PONumber:any, venderNo:any, shippingNumber:any, email: string) : Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Receiving/createROHeader?PONumber=${PONumber}&venderNo=${venderNo}&shippingNumber=${shippingNumber}&UserEmail=${email}`);    
  }

  public updateROItems(roNumber:string, roItems: RoItem[] ) : Observable<RoItem[]> {  console.log("update ro");
    return this.http.put<RoItem[]>(`${environment.apiUrl}/api/Receiving/update/${roNumber}`, roItems);
  }
  public updateStatus(roNumber:string, status: string, roItems: RoItem[] ) : Observable<ReceiveOrder> {
    return this.http.put<ReceiveOrder>(`${environment.apiUrl}/api/Receiving/updateStatus/${roNumber}/${status}`, roItems);
  }

  public getROItemsByRONum(roNumber:string) : Observable<RoItem[]> {
    return this.http.get<RoItem[]>(`${environment.apiUrl}/api/Receiving/receivingItemsByRO/${roNumber}`);
  }

  public getROByRONum(roNumber:string) : Observable<ReceiveOrder> {
    return this.http.get<ReceiveOrder>(`${environment.apiUrl}/api/Receiving/receivingByRO/${roNumber}`);
  }

  public submitRO(ro: ReceiveOrder) : Observable<ReceiveOrder> {
    return this.http.post<ReceiveOrder>(`${environment.apiUrl}/api/Receiving/createreceiving`, ro);
  }

  public getVenderByNum(num:string) : Observable<Vender> {
    return this.http.get<Vender>(`${environment.apiUrl}/api/Vender/venderExist/${num}`);
  }

 

}
