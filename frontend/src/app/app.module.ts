import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ɵɵsanitizeUrlOrResourceUrl } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor,
         ErrorInterceptor,
         AccountService,
         AuthGuard } from './_services';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AccessComponent } from './access/access.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ShipsComponent } from './ships/ships.component';
import { ShipComponent } from './ship/ship.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { BinManagementComponent } from './bin-management/bin-management.component';
import { PagingComponent } from './paging/paging.component';
import { BinsComponent } from './bins/bins.component';
import { BinItemsComponent } from './bin-items/bin-items.component';
import { BinItemManagementComponent } from './bin-item-management/bin-item-management.component';
import { BinCreateComponent } from './bin-create/bin-create.component';
import { BinEditComponent } from './bin-edit/bin-edit.component';
import { ItemBinsComponent } from './item-bins/item-bins.component';
import { ReceivingOrdersComponent } from './receiving-orders/receiving-orders.component';
import { ReceivingOrderComponent } from './receiving-order/receiving-order.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { ShipRecordsComponent } from './ship-records/ship-records.component';
import { ShipEditComponent } from './ship-edit/ship-edit.component';
import { ReceivingCreateComponent } from './receiving-create/receiving-create.component';
import { ReceivingDetailComponent } from './receiving-detail/receiving-detail.component';
import { PutAwayComponent } from './put-away/put-away.component';
import { PutAwayListsComponent } from './put-away-lists/put-away-lists.component';
import { ReplenishmentComponent } from './replenishment/replenishment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent,
    UsersComponent,
    AccessComponent,
    FooterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,   
    ProfileComponent,
    BinManagementComponent,
    PagingComponent,
    BinsComponent,
    BinItemsComponent,
    BinItemManagementComponent,
    BinCreateComponent,
    BinEditComponent,
    ItemBinsComponent,
    ReceivingOrdersComponent,
    ReceivingOrderComponent,
    ShipsComponent,
    ShipComponent,
    ShipDetailComponent,
    ShipRecordsComponent,
    ShipEditComponent,
    ReceivingCreateComponent,
    ReceivingDetailComponent,
    PutAwayComponent,
    PutAwayListsComponent,
    ReplenishmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CommonModule
  ],
  providers: [
    AccountService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }