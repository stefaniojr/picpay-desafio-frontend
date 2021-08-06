import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeusPagamentosComponent } from './components/meus-pagamentos/meus-pagamentos.component';
import { AppComponent } from './app.component';
import { MatSortModule } from '@angular/material/sort';
import { DateFormatPipe } from './pipes/date-format.pipe';
@NgModule({
  declarations: [
    AppComponent,
    MeusPagamentosComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
