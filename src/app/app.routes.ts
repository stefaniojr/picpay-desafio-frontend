import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";

export const ROUTES: Routes = [
  { path: "", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
];
