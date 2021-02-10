import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bin, BinType } from '../_models';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BinService {

  constructor(private http: HttpClient) { }

  public get(): Observable<Bin[]> {
    return this.http.get<Bin[]> (`${environment.apiUrl}/api/bin`);
  }

  public add(bin: Bin){
     return this.http.post(`${environment.apiUrl}/api/bin`, bin).subscribe();
   }

   public getById(id: number): Observable<Bin> {
    return this.http.get<Bin> (`${environment.apiUrl}/api/bin/${id}`);
  }

  public update(id: number, bin: Bin): Observable<Bin> {
    return this.http.put<Bin> (`${environment.apiUrl}/api/bin/${id}`, bin);
  }

  public getQuery(page: number, perPage: number, type: string, location: string, minCode: string, maxCode: string ): Observable<Bin[]> {
    if( !(maxCode && minCode) ){
      let code = !(maxCode) ? minCode:maxCode;
      console.log("code is", code);
      return this.http.get<Bin[]>(`${environment.apiUrl}/api/bin/byBinCode?code=${code}`);
    }
    else if( maxCode===minCode) {
      return this.http.get<Bin[]>(`${environment.apiUrl}/api/Bin/byBinCode?code=${minCode}`);
    }

    return this.http.get<Bin[]> (`${environment.apiUrl}/api/Bin/byBinParams?pageNumber=${page}&pageSize=${perPage}&
    TypeName=${type}&LocationName=${location}&MinCode=${minCode}&MaxCode=${maxCode}`);
    
  }

  public getBinType(): Observable<BinType[]>{
    return this.http.get<BinType[]>(`${environment.apiUrl}/api/BinType`);
  }

  public getWarehouseLocation(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/warehouseLocation`);
  }

  public getBinCode(): Observable<Bin>{
    return this.http.get<Bin>(`${environment.apiUrl}/api/BinType`);
  }





}
