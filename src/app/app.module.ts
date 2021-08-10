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

// Components
import { LoginComponent } from "./views/login/login.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { PaymentsComponent } from "./views/payments/payments.component";
import { LoginFormComponent } from "./shared/components/login-form/login-form.component";
import { ToolbarComponent } from "./shared/components/toolbar/toolbar.component";
import { LocalDateTimePipe } from "./shared/pipes/local-date-time.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaymentsComponent,
    LoginFormComponent,
    ToolbarComponent,
    LocalDateTimePipe,
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
  ],
  providers: [LocalDateTimePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
