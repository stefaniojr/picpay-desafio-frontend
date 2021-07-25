import { Component, OnInit } from "@angular/core";
import { ModalService } from "./modal";
import { CardListType } from "./models/card";
import UserType from "./models/user";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Desafio Picpay Front-end";
  selectedUser: UserType;
  cards: CardListType;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  users: Array<UserType> = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  async openPaymentModal(modalId: string, user: UserType) {
    this.cards = await this.userService.getUserCards(user.id);
    this.selectedUser = user;
    this.modalService.open(modalId);
  }
}
