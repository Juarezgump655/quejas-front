import { BodyComponent } from './componentes/dashboard/body/body.component';

//Componentes
import { LoginComponent } from './componentes/login/login.component';
import { MiPrestamitoRegistrarseComponent } from './componentes/Usuario-Externo/Mi-prestamito-registrarse/Mi-prestamito-registrarse.component';

//Material
import { NgModule, ɵɵsyntheticHostProperty } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './componentes/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './componentes/helpers/auth.interceptor';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AutoConsultaComponent } from './componentes/auto-consulta/auto-consulta.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MiPrestamitoRegistrarseComponent,
    AutoConsultaComponent
  
   

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,useClass: Interceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    MatCheckboxModule,
    NgxCaptchaModule

  ]

})
export class AppModule { }
