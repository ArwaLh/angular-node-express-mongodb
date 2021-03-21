import { SharedModule } from './shared/shared.module';
import { ViewContactComponent } from './components/contact/view-contact/view-contact.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';

import { AuthGuard } from './auth.guard';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddContactComponent } from './components/contact/add-contact/add-contact.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MenuComponent,
    ContactListComponent,
    ContactComponent,
    AddContactComponent,
    LoginComponent,
    ViewContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [ApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
