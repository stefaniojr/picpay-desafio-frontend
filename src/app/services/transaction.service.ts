import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {}

  postTransaction(payload: PostTransactionPayload): Observable<any> {
    const endpoint = `${environment.TRANSACTION_SERVICE_API}/533cd5d7-63d3-4488-bf8d-4bb8c751c989`;

    return this.httpClient.post<any>(endpoint, payload, {
      headers: this.headers,
    });
  }
}
