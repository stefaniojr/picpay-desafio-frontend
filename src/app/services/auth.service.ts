import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { classToPlain } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { Token } from './../login/models/token.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new BehaviorSubject(null);
  public loggedOut = new BehaviorSubject(null);

  key = 'token';

  constructor(private storage: StorageService, private router: Router) {}

  /**
   * Realiza o login do usuário
   * @param token token de autenticação
   */
  async login(token: Token) {
    await this.storage.set(this.key, classToPlain(token));
    this.loggedIn.next(token);
  }

  /**
   * Realiza o logout do usuário
   */
  public async logout(): Promise<void> {
    await this.storage.clear();
    this.loggedOut.next(true);
    this.router.navigate(['/login']);
  }

  /**
   * Verifica se o usuário está autenticado
   */
  public async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get(this.key);
    return token != null;
  }
}
