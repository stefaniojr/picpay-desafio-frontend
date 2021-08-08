import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { IAccount } from "../interfaces/Account";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  baseUrl: string = "http://localhost:3000/account";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  login(data: IAccount): Observable<IAccount[]> {
    return this.httpClient.get<IAccount[]>(this.baseUrl);
  }
}
