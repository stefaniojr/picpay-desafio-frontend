import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './extras/translate-paginator';
@NgModule({
  declarations: [
    PaymentsComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentsModule { }
