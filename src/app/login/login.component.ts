import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup; // define um formulário a ser usado para login.

  constructor(private fb: FormBuilder) { }

  async ngOnInit() {
    // inicia fiels dos formulários.
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
  });

  }

  public onLogin(): void{
    console.log('teste!');
  }

}
