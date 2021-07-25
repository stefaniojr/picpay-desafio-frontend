import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { GetUsersResponse } from "../models/response/getUsersResponse.model";
import { CardListType, CardType } from "../models/card";

@Injectable({
  providedIn: "root",
})
export class UserService {
  headers: HttpHeaders;

  cards: CardListType = [
    // valid card
    {
      card_number: "1111111111111111",
      cvv: 789,
      expiry_date: "01/18",
    },
    // invalid card
    {
      card_number: "4111111111111234",
      cvv: 123,
      expiry_date: "01/20",
    },
  ];

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<GetUsersResponse> {
    const endpoint = `${environment.USER_SERVICE_API}/5d531c4f2e0000620081ddce`;

    return this.httpClient.get<GetUsersResponse>(endpoint, {
      headers: this.headers,
    });
  }

  async getUserCards(userId: number) {
    console.log("Simulate fetch user cards by id... ", userId);

    return new Promise<CardListType>((resolve, reject) => {
      setTimeout(() => resolve(this.cards), 1000);
    });
  }

  async getCardByNumber(cardNumber: string) {
    const card = this.cards.filter(
      (card) => card.card_number === cardNumber
    )[0];

    return new Promise<CardType>((resolve, reject) => {
      setTimeout(() => resolve(card), 500);
    });
  }
}
