import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

//COMPONENTS
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";

//MATERIAL
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [AppComponent, LoginComponent, LoginFormComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    //MATERIAL
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
