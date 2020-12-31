import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url : string = "https://localhost:5001/api/user";

  constructor(private http: HttpClient) { }

  public get(): Observable<User[]> {
    return this.http.get<User[]> (this.url);
  }

  public add(user: User){
     return this.http.post(this.url, user).subscribe();
   }

   public getById(id: number): Observable<User> {
    return this.http.get<User> (this.url + `/${id}` );
  }


}
