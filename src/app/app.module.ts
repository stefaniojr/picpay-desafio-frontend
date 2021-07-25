import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ModalModule } from "./modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NgxCurrencyModule} from "ngx-currency"


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
