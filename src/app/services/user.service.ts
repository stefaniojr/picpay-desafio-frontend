import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { GetUsersResponse } from "../models/response/getUsersResponse.model";

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
}
