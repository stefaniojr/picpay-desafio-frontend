import { Component, OnInit } from "@angular/core";
import UserType from "./models/user";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Desafio Picpay Front-end";

  constructor(private userService: UserService) {}

  users: Array<UserType> = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }
}
