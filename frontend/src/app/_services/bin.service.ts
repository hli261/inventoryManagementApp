import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bin, BinType, BinItem, CreateBin } from '../_models';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BinService {

  constructor(private http: HttpClient) { }

  public get(): Observable<Bin[]> {
    return this.http.get<Bin[]> (`${environment.apiUrl}/api/bin`);
  }

  public add(bin: CreateBin){
     return this.http.post(`${environment.apiUrl}/api/Bin/createBin`, bin);
   }

   public getById(id: number): Observable<Bin> {
    return this.http.get<Bin> (`${environment.apiUrl}/api/bin/${id}`);
  }

  public update(id: number, bin: Bin): Observable<Bin> {
    return this.http.put<Bin> (`${environment.apiUrl}/api/bin/${id}`, bin);
  }

  public getQuery(page: number, perPage: number, type: string, location: string, minCode: string, maxCode: string ): Observable<Bin[]> {
 

    // console.log(`${environment.apiUrl}/api/Bin/byBinParams?pageNumber=${page}&pageSize=${perPage}
    // &TypeName=${type}&LocationName=${location}&MinCode=${minCode}&MaxCode=${maxCode}`);
    return this.http.get<Bin[]> (`${environment.apiUrl}/api/Bin/byBinParams?pageNumber=${page}&pageSize=${perPage}&TypeName=${type}&LocationName=${location}&MinCode=${minCode}&MaxCode=${maxCode}`);
    
  }

  public getBinType(): Observable<BinType[]>{
    return this.http.get<BinType[]>(`${environment.apiUrl}/api/BinType`);
  }

  public getWarehouseLocation(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/warehouseLocation`);
  }

  public getbyBinCode(code: string): Observable<BinItem>{
    return this.http.get<BinItem>(`${environment.apiUrl}/api/byBinCode/${code}`);
  }

  public getbyItemNumber(num: string): Observable<BinItem>{
    return this.http.get<BinItem>(`${environment.apiUrl}/api/byBinCode/${num}`);
  }

  public getbyBinId(id: number): Observable<BinItem>{
    return this.http.get<BinItem>(`${environment.apiUrl}/api/BinItem/${id}`);
  }





}
