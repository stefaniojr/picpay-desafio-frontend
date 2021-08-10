import { environment } from './../../environments/environment';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthenticated: boolean = false

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private tostrService: ToastrService) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable()
  }

  login = (user: User) => {
    if (user.email === 'usuario@gmail.com' && user.password === 'usuario') {
      this.userAuthenticated = true
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    } else {
      this.loggedIn.next(false);
      this.userAuthenticated = false
      this.tostrService.error('Usuário ou senha inválidos')
    }
    return this.userAuthenticated
  }

  logout = () => {
    this.userAuthenticated = false
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
