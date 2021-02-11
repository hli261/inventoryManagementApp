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
import { BinManagementComponent } from './bin-management/bin-management.component';
import { BinItemsComponent } from './bin-items/bin-items.component';
import { BinItemManagementComponent } from './bin-item-management/bin-item-management.component';

import { AuthGuard, RoleGuard } from './_services';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },  
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'reset-password', component: ResetPasswordComponent},  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [     
      { path: 'profile/:id', component: ProfileComponent}
        ],
    }, 
  {
  path: '',
  canActivate:[RoleGuard],
  data:{
   role:  "Admin"         
  },
  children: [
    { path: 'users', component: UsersComponent },
    { path: 'access/:email', component: AccessComponent },
  ]  
  },
  {
  path: '',
  canActivate:[RoleGuard],
  data:{
   role:  "BinManagement"         
  },
  children: [
    { path: 'bins', component: BinManagementComponent },
    { path: 'bin-item', component: BinItemManagementComponent },
    { path: 'bin-items/:id', component: BinItemsComponent },
  ]  
},
{
  path: '',
  canActivate:[RoleGuard],
  data:{
   role:  "Receiving"         
  },
  children: [
    { path: 'ships', component: ShipsComponent },
    { path: 'ship', component: ShipComponent },
    { path: 'ship/:id', component: ShipComponent },
  ]  
},  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
