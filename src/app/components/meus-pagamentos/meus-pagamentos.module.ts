import { CommonModule } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';

import { NgxCurrencyModule } from "ngx-currency";
import { MeusPagamentosComponent } from './meus-pagamentos.component';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { VisibleOnHoverDirective } from 'src/app/directives/visible-on-hover.directive';
import { DialogManagerComponent } from './dialog-manager/dialog-manager.component';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { MatPaginatorIntlPt } from 'src/app/share/mat-paginator-intl-pt';

import { MeusPagamentosRoutingModule } from './meus-pagamentos-routing.module';


registerLocaleData(ptBr);

@NgModule({
  declarations: [
    MeusPagamentosComponent,
    DateFormatPipe,
    VisibleOnHoverDirective,
    DialogManagerComponent,
    DialogTemplateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
    MeusPagamentosRoutingModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPt }
  ],
})
export class MeusPagamentosModule { }
