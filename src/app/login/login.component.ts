import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup; // define um formulário a ser usado para login.
  public loading = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private auth: AuthService) {}

  async ngOnInit() {
    // inicia fiels dos formulários.
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  /**
  * Realiza login do usuário e redireciona para a rota path
  */
  public async onLogin() {
    if (this.form.valid) {
      this.loading = true; // inicia carregamento
      try {
        const token = await this.api.login(this.form.value.email, this.form.value.password); // faz requisição à api e recupera o token
        // realiza o login do usuário
        await this.auth.login(token); // salva o token
        this.router.navigate(['/']); // redireciona para root path
        this.form.reset(); // reseta o form
      } catch (e) {
        console.log(e);
      }
      this.loading = false; // finaliza carregamento
    }
  }
}
