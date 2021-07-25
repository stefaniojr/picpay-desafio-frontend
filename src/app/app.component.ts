import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalService } from "./modal";
import { CardListType } from "./models/card";
import UserType from "./models/user";
import { TransactionService } from "./services/transaction.service";
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
  paymentForm: FormGroup;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService
  ) {}

  users: Array<UserType> = [];

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      amount: this.formBuilder.control(null),
      cardNumber: this.formBuilder.control(null),
    });

    this.userService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  async openPaymentModal(modalId: string, user: UserType) {
    this.cards = await this.userService.getUserCards(user.id);
    this.selectedUser = user;
    this.modalService.open(modalId);
  }

  async onSubmit() {
    const { amount, cardNumber } = this.paymentForm.value;
    if (!amount || !cardNumber) return;

    const card = await this.userService.getCardByNumber(cardNumber);

    this.transactionService
      .postTransaction({
        ...card,
        destination_user_id: this.selectedUser.id,
        value: amount,
      })
      .subscribe((response) => {
        console.log("response ->", response);
      });
  }
}
