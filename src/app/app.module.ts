import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ModalModule } from "./modal";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ModalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
