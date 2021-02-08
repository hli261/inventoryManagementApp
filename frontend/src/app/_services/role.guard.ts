import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
 
    roles: Array<string>;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

        canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            let token = this.authService.readToken();
            this.roles = token.role;
            if (this.authService.isAuthenticated() && this.roles.includes(next.data.role)) {
               return true;
            }
        
            // navigate to not found page
            this.router.navigate(['/404']);
            return false;

    }

    
}