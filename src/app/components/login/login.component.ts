import { User } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
  )

  private user: User = new User()

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  login = () => {
    this.user.email = this.email.value
    this.user.password = this.password.value

    this.authService.login(this.user)

  }

}
