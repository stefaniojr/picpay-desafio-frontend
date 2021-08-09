import { BrowserModule } from '@angular/platform-browser';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import ptBr from '@angular/common/locales/pt';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MeusPagamentosComponent } from './components/meus-pagamentos/meus-pagamentos.component';
import { AppComponent } from './app.component';
import { MatSortModule } from '@angular/material/sort';
import { DateFormatPipe } from './pipes/date-format.pipe';

registerLocaleData(ptBr);
import { registerLocaleData } from '@angular/common';
import { VisibleOnHoverDirective } from './directives/visible-on-hover.directive';
import { DialogManagerComponent, DialogTemplateComponent } from './components/meus-pagamentos/dialog-manager/dialog-manager.component';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
    AppComponent,
    MeusPagamentosComponent,
    DateFormatPipe,
    VisibleOnHoverDirective,
    DialogManagerComponent,
    DialogTemplateComponent
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
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
