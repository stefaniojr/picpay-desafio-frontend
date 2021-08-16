import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserModel } from "../models/user-model";

@Injectable()
export class UsersService {
  usersApiUrl = "http://localhost:3000/users";
  constructor(private http: HttpClient) {}

  getUser(mail?: String, password?: String): Observable<UserModel[]> {
    if (mail && password) {
      return this.http.get<UserModel[]>(
        `${this.usersApiUrl}?mail=$mail}&password=${password}`
      );
    }
  }
}
