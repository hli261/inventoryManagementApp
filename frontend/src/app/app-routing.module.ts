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
import { ShipRecordComponent } from './ship-record/ship-record.component';
import { ShipEditComponent } from './ship-edit/ship-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { BinManagementComponent } from './bin-management/bin-management.component';
import { BinItemsComponent } from './bin-items/bin-items.component';
import { BinItemManagementComponent } from './bin-item-management/bin-item-management.component';
import { BinCreateComponent } from './bin-create/bin-create.component';
import { BinEditComponent } from './bin-edit/bin-edit.component';
import { ReceivingOrdersComponent } from './receiving-orders/receiving-orders.component';
import { ReceivingOrderComponent } from './receiving-order/receiving-order.component';

import { AuthGuard, RoleGuard } from './_services';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'profile/:id', component: ProfileComponent }
    ],
  },
  {
    path: '',
    canActivate: [RoleGuard],
    data: {
      role: "Admin"
    },
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'access/:email', component: AccessComponent },
    ]
  },
  {
    path: '',
    canActivate: [RoleGuard],
    data: {
      role: "BinManagement"
    },
    children: [
      { path: 'bins', component: BinManagementComponent },
      { path: 'bins-list', component: BinManagementComponent },
      { path: 'bin-item', component: BinItemManagementComponent },
      { path: 'bin-items', component: BinItemsComponent },
      { path: 'bin-items/:binCode', component: BinItemsComponent },
      { path: 'bincreate', component: BinCreateComponent },
      { path: 'binedit/:binCode', component: BinEditComponent },
    ]
  },
  {
    path: '',
    canActivate: [RoleGuard],
    data: {
      role: "Receiving"
    },
    children: [
      { path: 'ships', component: ShipsComponent },
      { path: 'ship', component: ShipComponent },
      { path: 'ship-detail/:shipNum', component: ShipRecordComponent },
      { path: 'ship-edit/:shipNum', component: ShipEditComponent },
      { path: 'orders', component: ReceivingOrdersComponent },
      { path: 'order', component: ReceivingOrderComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }