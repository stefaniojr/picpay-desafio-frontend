import { Component, OnInit } from "@angular/core";
import { IAccount } from "../../interfaces/Account";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  userData: IAccount;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.userData = JSON.parse(localStorage.getItem("@user"));
    console.log(this.userData);
  }

  logout(): void {
    this.loginService.logout();
  }
}
