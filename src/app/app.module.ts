import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import ptBr from '@angular/common/locales/pt';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeusPagamentosComponent } from './components/meus-pagamentos/meus-pagamentos.component';
import { AppComponent } from './app.component';
import { MatSortModule } from '@angular/material/sort';
import { DateFormatPipe } from './pipes/date-format.pipe';

registerLocaleData(ptBr);
import { registerLocaleData } from '@angular/common';

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
    MatSortModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
