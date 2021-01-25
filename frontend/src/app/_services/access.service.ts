import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  constructor(private http: HttpClient) { }

  // public get(): Observable<User[]> {
  //   return this.http.get<User[]> (`${environment.apiUrl}/api/admin/users-with-roles`);
  // }

  public getByEmail(email: any): Observable<string[]> {
    return this.http.get<string[]> (`${environment.apiUrl}/api/admin/user-with-roles/${email}`);
   }

  // public update(email: string, roles: any): Observable<User> {
  //   return this.http.put<User>(`${environment.apiUrl}/api/admin/edit-role/${email}`, roles);
  // }

  public addAccess(email: string, role: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/admin/add-role/${email}`,role);
  }

  public deleteAccess(email: string, role: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/admin/delete-role/${email}`, role);
  }
  // public deleteAccess(email: string, role: any) {
  //   return this.http.delete(`${environment.apiUrl}/api/admin/delete-role/${email}`, role);
  // }

}
