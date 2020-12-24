import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url : string = "https://localhost:5001/api/user";

  constructor(private http: HttpClient) { }

  public get(): Observable<User[]> {
    return this.http.get<User[]> (this.url);
  }

  public addUser(user: User){
     return this.http.post(this.url, user).subscribe();
   }


}
