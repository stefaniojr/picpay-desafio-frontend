import { Injectable } from '@angular/core';
import { Token } from '../login/models/token.model';
import { classToPlain, plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}
  /**
   * Account URLS
   */
  public static LOGIN_URL = 'login/';

  /**
   * Método para realizar login
   * @param email do usuário
   * @param password senha
   */
  public async login(email: string, password: string): Promise<any> {
    return await this.makePost(ApiService.LOGIN_URL, { email, password }, Token);
  }

  /**
   * Realiza uma requisição do tipo POST
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   * @param authorize necessita de autenticação?
   */
  private async makePost<T>(endpoint: string, data: any, model: ClassConstructor<T>): Promise<any> {
    // try {
    const res = await this.http.post(this.buildURL(endpoint), data).toPromise();
    if (typeof (model as any).toClass === 'function') {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Retorna a URL baseado no endpoint especificado
   * @param endpoint endpoint a ser chamado
   */
  protected buildURL(endpoint: string): string {
    const url = this.getBaseURL() + endpoint;
    return url;
  }

  /**
   * Retorna a URL Base da API
   * Concatena a URL base da configuração
   */
  protected getBaseURL(): string {
    let baseURL = 'http://localhost:3000/';
    return baseURL;
  }
}
