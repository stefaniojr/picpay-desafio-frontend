import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./views/login/login.component";
import { PaymentsComponent } from "./views/payments/payments.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "payments",
    component: PaymentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
