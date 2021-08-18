import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserModel } from "src/app/models/user-model";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  providers: [UsersService],
})
export class LoginFormComponent implements OnInit {
  loginError: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  private user: UserModel = new UserModel();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  login = () => {
    this.usersService
      .getUser(this.email.value, this.password.value)
      .subscribe((response: UserModel[]) => {
        this.user = response[0];

        if (
          this.user?.password == this.password.value &&
          this.user?.email === this.email.value
        ) {
          this.authService.login(this.user);
        } else {
          this.loginError = true;
        }

        this.loginForm.reset();
      });
  };
}
