import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  loginFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      mail: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  verifyForm() {
    console.log(this.loginFormGroup.get("mail"));
    if (!this.loginFormGroup.valid) {
      console.log("Formulário inválido");
      return;
    }
    console.log("Formulário válido", this.loginFormGroup.value);
  }
}
