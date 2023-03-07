import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent} from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SvgComponent } from './svg/svg.component';
import { FormComponent } from './form/form.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import { TableComponent } from './table/table.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SliderModule} from "primeng/slider";
import {SpinnerModule} from "primeng/spinner";
import {ButtonModule} from "primeng/button";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SvgComponent,
    FormComponent,
    SignUpComponent,
    TableComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    SliderModule,
    SpinnerModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
