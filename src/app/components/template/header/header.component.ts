import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {

    this.authService.isLoggedIn.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    )

  }

  logout = () => {
    this.authService.logout()
  }

  showNavBar = () => {
    return this.router.url !== '/login'
  }

}
