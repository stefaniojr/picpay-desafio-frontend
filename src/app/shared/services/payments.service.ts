import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IAccount } from "../interfaces/Account";

import { IPayments } from "../interfaces/Payments";

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  baseUrl: string = "http://localhost:3000/tasks";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getPayments(page: number, limit: number): Observable<IPayments[]> {
    let params = new HttpParams();
    params = params.append("_page", String(page));
    params = params.append("_limit", String(limit));

    return this.httpClient.get<IPayments[]>(this.baseUrl, { params }).pipe(
      map((payments: IPayments[]) => payments),
      catchError((error) => throwError(error))
    );
  }
}
