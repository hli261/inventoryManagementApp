import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';
import { AccessComponent } from './access/access.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ShipsComponent } from './ships/ships.component';
import { ShipComponent } from './ship/ship.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard], 
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'users', component: UsersComponent },
      { path: 'access/:id', component: AccessComponent },  
      { path: 'profile/:id', component: ProfileComponent},
      { path: 'profile/:email', component: ProfileComponent},
      { path: 'forget-password', component: ForgetPasswordComponent},
      { path: 'reset-password', component: ResetPasswordComponent},
      { path: 'ships', component: ShipsComponent},
      { path: 'ship', component: ShipComponent },
      { path: 'ship/:id', component: ShipComponent },
      { path: 'response-reset-password/:token', component: ResetPasswordComponent},
        ],
    },  
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
