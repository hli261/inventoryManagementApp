import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

        canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            const user = this.authService.readToken();

            if (user.Role === next.data.role) {
              return true;
            }
        
            // navigate to not found page
            this.router.navigate(['/404']);
            return false;

    }

    
}