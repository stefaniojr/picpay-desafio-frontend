import { UserModel } from "./../models/user-model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userAuthenticated: boolean = false;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login = (user: UserModel) => {
    if (user) {
      this.userAuthenticated = true;
      this.loggedIn.next(true);
      this.router.navigate(["/home"]);
    } else {
      this.loggedIn.next(false);
      this.userAuthenticated = false;
    }
    return this.userAuthenticated;
  };

  logout = () => {
    this.userAuthenticated = false;
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  };
}
