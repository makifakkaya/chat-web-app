import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component'
import {TokenInterceptor} from './service/token.interceptor.';
import {ErrorInterceptor} from "./service/error.interceptor";
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
