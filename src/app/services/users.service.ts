import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserModel } from "../models/user-model";

@Injectable()
export class UsersService {
  usersApiUrl = "http://localhost:3000/account";
  constructor(private http: HttpClient) {}

  getUser(email: String, password: String): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      `${this.usersApiUrl}?mail=${email}&password=${password}`
    );
  }
}
