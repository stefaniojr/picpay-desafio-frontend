import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { classToPlain, plainToClass } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';
import { Token } from './../login/models/token.model';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new BehaviorSubject(null);
  public loggedOut = new BehaviorSubject(null);

  TOKEN = 'token';

  constructor(private storage: StorageService, private api: ApiService, private router: Router) {}

  /**
   * Realiza o login do usuário
   * @param token token de autenticação
   */
  async login(token: Token) {
    await this.storage.set(this.TOKEN, classToPlain(token));
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
   * Recupera o token de autenticação
   */
  public async getToken(): Promise<Token> {
    return plainToClass(Token, await this.storage.get(this.TOKEN));
  }

  /**
   * Verifica se o usuário está autenticado
   */
  public async isAuthenticated(): Promise<boolean> {
    const token = await this.storage.get(this.TOKEN);
    return token != null;
  }
}
