import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bin } from '../_models';
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
}
