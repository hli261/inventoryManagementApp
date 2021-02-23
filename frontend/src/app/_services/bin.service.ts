import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bin, BinType, BinItem, CreateBin, BinEdit, Item } from '../_models';
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

  public deleteBin(binCode: string, bin: any): Observable<any> {
    return this.http.delete<any> (`${environment.apiUrl}/api/bin/${binCode}`, bin);
  }

  public getByBinCode(binCode: string): Observable<Bin>{
    return this.http.get<Bin> (`${environment.apiUrl}/api/Bin/byBinCode/${binCode}`);
  }

  public getItemByNum(num:string): Observable<Item>{
    return this.http.get<Item>(`${environment.apiUrl}/api/Item/byNumber/${num}`);
  }

  public getQuery(page: number, perPage: number, type: string, location: string, minCode: string, maxCode: string ): Observable<Bin[]> {
     return this.http.get<Bin[]> (`${environment.apiUrl}/api/Bin?pageNumber=${page}&pageSize=${perPage}&TypeName=${type}&LocationName=${location}&MinCode=${minCode}&MaxCode=${maxCode}`);
  }

  public getBinType(): Observable<BinType[]>{
    return this.http.get<BinType[]>(`${environment.apiUrl}/api/BinType`);
  }

  public getWarehouseLocation(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/api/warehouseLocation`);
  }

  public getbyBinCode(code: string): Observable<BinItem>{
    return this.http.get<BinItem>(`${environment.apiUrl}/api/bin/byBinCode/${code}`);
  }

  public getbyItemNumber(num: string): Observable<BinItem>{
    return this.http.get<BinItem>(`${environment.apiUrl}/api/byBinCode/${num}`);
  }

  public getbyBinId(code: string): Observable<BinItem>{
    return this.http.get<BinItem>(`${environment.apiUrl}/api/BinItem/byBinCode/${code}`);
  }

  public getItembyBin(code: string): Observable<BinItem[]>{
    return this.http.get<BinItem[]>(`${environment.apiUrl}/api/binitem/byBinCode/${code}`);
  }

  public getBinbyItem(num: string): Observable<BinItem[]>{
    return this.http.get<BinItem[]>(`${environment.apiUrl}/api/binitem/byNumber/${num}`);
  }

}
