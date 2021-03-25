import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import 'hammerjs';
import {AlertModule} from "ngx-bootstrap";
import {LoginComponent} from "./login/login.component";
import {LoginService} from "./api-module/api/login.service";
import {TokenInterceptor} from "./shared/token-interceptor";
import {SessionManager} from "./shared/session-manager";
import {SharedVariables} from './shared/shared-variables';
import {WeblogicTomcatAnalysisService} from './api-module/api/weblogic-tomcat-analysis-service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  { path: 'configurationmanager', loadChildren: './configurationmanager/configurationmanager.module#ConfigurationmanagerModule' },
  { path: '**', redirectTo: 'configurationmanager' }
];
@NgModule({
  declarations: [
    AppComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //RouterModule.forRoot(routes, {enableTracing: true}),
    RouterModule.forRoot(routes),
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  providers: [
    LoginService,
    SharedVariables,
    SessionManager,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
