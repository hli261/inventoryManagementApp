import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BinItem, PutAway, ReceiveOrder} from '../_models';

@Injectable({
  providedIn: 'root'
})
export class PutAwayService {

  constructor(private http : HttpClient ) { }
  
  public getItemByReceiving(binCode: string): Observable<BinItem[]>{
    return this.http.get<BinItem[]>(`${environment.apiUrl}/api/BinItem/byBinCode/${binCode}`);
  }
    
  public moveToReceiving(ro: ReceiveOrder) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/CreateReceivingBinItems`, ro);
  }
  
  //put away
  public moveToPutAway(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/CreatePutAwayBinItems`, binItem);
  }

  public removeFromReceiving(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/RemoveReceivingBinItems`, binItem);
  }

  public removeFromPutAway(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/RemovePutawayBinItems`, binItem);
  }

  public moveToBin(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/CreateBinItemAfterPutaway`, binItem);
  }

  //replenishment
  public moveToReplenishment(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/CreateReplenishmentBinItem`, binItem);
  }

  public removeFromOverstock(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/RemoveOverstockBinItem`, binItem);
  }

  public moveToPrimary(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/CreateBinItemAfterReplenishment`, binItem);
  }

  public removeFromReplenishment(binItem: PutAway) : Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/BinItem/RemoveReplenishmentBinItem`, binItem);
  }

}
