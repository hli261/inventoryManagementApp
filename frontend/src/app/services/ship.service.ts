import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ship } from '../ship';

@Injectable({
  providedIn: 'root'
})

export class ShipService {

  private url : string = "https://localhost:5001/api/ship";

  constructor(private http: HttpClient) { }

  public get(): Observable<Ship[]> {
    return this.http.get<Ship[]> (this.url);
  }

  public add(ship: Ship){
     return this.http.post(this.url, ship).subscribe();
   }

   public getById(id: number): Observable<Ship> {
    return this.http.get<Ship> (this.url + `/${id}`);
  }

  public update(id: number, ship: Ship): Observable<Ship> {
    return this.http.put<Ship> (this.url + `/${id}`, ship);
  }

}
