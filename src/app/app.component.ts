import { Component, OnInit } from "@angular/core";
import { users } from "./usuariosMock";
import UserType from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Desafio Picpay Front-end";

  users: Array<UserType> = [];

  ngOnInit(): void {
    this.users = users;
    console.log(this.users);
  }
}
