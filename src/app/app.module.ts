import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

// Material
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";

// Components
import { LoginComponent } from "./views/login/login.component";
import { PaymentsComponent } from "./views/payments/payments.component";
import { LoginFormComponent } from "./shared/components/login-form/login-form.component";
import { ToolbarComponent } from "./shared/components/toolbar/toolbar.component";
import { LocalDateTimePipe } from "./shared/pipes/local-date-time.pipe";
import { AddPaymentDialogComponent } from './shared/components/add-payment-dialog/add-payment-dialog.component';
import { DeletePaymentDialogComponent } from './shared/components/delete-payment-dialog/delete-payment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaymentsComponent,
    LoginFormComponent,
    ToolbarComponent,
    LocalDateTimePipe,
    AddPaymentDialogComponent,
    DeletePaymentDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDialogModule,
  ],
  providers: [LocalDateTimePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
