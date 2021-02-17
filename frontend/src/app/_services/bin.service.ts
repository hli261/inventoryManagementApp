import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bin, BinType, BinItem, CreateBin, BinEdit } from '../_models';
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

  public update(binCode: string, bin: BinEdit): Observable<BinEdit> {
    return this.http.put<BinEdit> (`${environment.apiUrl}/api/bin`, bin);
  }

  public getByBinCode(binCode: string): Observable<Bin>{
    return this.http.get<Bin> (`${environment.apiUrl}/api/Bin/byBinCode/${binCode}`);
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

  public getItembyBin(code: string): Observable<BinItem[]>{
    return this.http.get<BinItem[]>(`${environment.apiUrl}/api/binitem/byBinCode?code=${code}`);
  }

  public getBinbyItem(num: string): Observable<BinItem[]>{
    return this.http.get<BinItem[]>(`${environment.apiUrl}/api/binitem/byItemNumber?number=${num}`);
  }

}
