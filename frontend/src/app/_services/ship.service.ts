import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ship } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ShipService {

  constructor(private http: HttpClient) { }

  public get(): Observable<Ship[]> {
    return this.http.get<Ship[]> (`${environment.apiUrl}/api/ship`);
  }

  public add(ship: Ship){
     return this.http.post(`${environment.apiUrl}/api/ship`, ship).subscribe();
   }

   public getById(id: number): Observable<Ship> {
    return this.http.get<Ship> (`${environment.apiUrl}/api/ship/${id}`);
  }

  public update(id: number, ship: Ship): Observable<Ship> {
    return this.http.put<Ship> (`${environment.apiUrl}/api/ship/${id}`, ship);
  }

}
