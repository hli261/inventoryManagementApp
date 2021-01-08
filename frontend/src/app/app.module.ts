import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ɵɵsanitizeUrlOrResourceUrl } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, ShipService, AccountService } from './_services';
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
    ShipsComponent,
    ShipComponent,
    ProfileComponent
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
    ShipService,
    AccountService,
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
