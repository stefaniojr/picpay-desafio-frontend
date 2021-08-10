import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IAccount } from "../../interfaces/Account";
import { LoginService } from "../../services/login.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup;
  userData: IAccount;
  invalidUser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(loginForm: IAccount) {
    this.loginService.login().subscribe((res) => {
      const user = res.find(
        (el) =>
          el.email === loginForm.email && el.password === loginForm.password
      );

      if (!user) {
        this.invalidUser = true;
      } else {
        localStorage.setItem("@user", JSON.stringify(user));
        this.userData = user;
        this.router.navigate(["payments"]);
      }
    });
  }
}
