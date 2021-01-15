import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  constructor(private http: HttpClient) { }

  public get(): Observable<User[]> {
    return this.http.get<User[]> (`${environment.apiUrl}/api/admin/users-with-roles`);
  }

  // public add(user: User){
  //    return this.http.post(`${environment.apiUrl}/api/ship`, user).subscribe();
  //  }

  //  public getById(id: number): Observable<User> {
  //   return this.http.get<User> (`${environment.apiUrl}/api/ship/${id}`);
  //  }

  public update(email: string, roles: any): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/api/admin/edit-role/${email}`, roles);
  }
}
