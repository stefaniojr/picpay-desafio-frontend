import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup; // define um formulário a ser usado para login.
  public loading = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {}

  async ngOnInit() {
    // inicia fiels dos formulários.
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public async onLogin() {
    if (this.form.valid) {
      this.loading = true;
      try {
        const token = await this.api.login(this.form.value.email, this.form.value.password);
        // realiza o login do usuário
        console.log(token);
        //await this.auth.login(token);
        this.router.navigate(['/']);
        this.form.reset();
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    }
  }
}
