import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (await this.auth.isAuthenticated()) {
      // redireciona para a home
      await this.router.navigate(['/']);
      return true;
    } else {
      await this.router.navigate(['/login']);
      return false;
    }
  }
}
