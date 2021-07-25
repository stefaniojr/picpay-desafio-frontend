import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { GetUsersResponse } from "../models/response/getUsersResponse.model";
import { CardListType } from "../models/card";

@Injectable({
  providedIn: "root",
})
export class UserService {
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<GetUsersResponse> {
    const endpoint = `${environment.USER_SERVICE_API}/5d531c4f2e0000620081ddce`;

    return this.httpClient.get<GetUsersResponse>(endpoint, {
      headers: this.headers,
    });
  }

  async getUserCards(userId: number) {
    const cards: CardListType = [
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

    console.log("Simulate fetch user cards by id... ", userId);

    return new Promise<CardListType>((resolve, reject) => {
      setTimeout(() => resolve(cards), 1000);
    });
  }
}
