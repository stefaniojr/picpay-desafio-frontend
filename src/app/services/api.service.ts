import { Injectable } from '@angular/core';
import { Token } from '../login/models/token.model';
import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
import { HttpClient } from '@angular/common/http';
import { Task } from '../payments/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}
  /**
   * URLS
   */
  public static LOGIN_URL = 'login/';
  public static TASKS_URL = 'tasks/';

  /**
   * Método para realizar login
   * @param email do usuário
   * @param password senha
   */
  public async login(email: string, password: string): Promise<any> {
    return await this.makePost(ApiService.LOGIN_URL, { email, password }, Token);
  }

  /**
   * Recupera o itinerário para o usuário
   */
  public async getTasks(): Promise<Task[]> {
    return await this.makeGet(ApiService.TASKS_URL, {}, Task);
  }

  /**
   * Realiza uma requisição do tipo POST
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   * @param authorize necessita de autenticação?
   */
  private async makePost<T>(endpoint: string, data: any, model: ClassConstructor<T>): Promise<any> {
    const res = await this.http.post(this.buildURL(endpoint), data).toPromise();
    if (typeof (model as any).toClass === 'function') {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Realiza uma requisição do tipo GET
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   * @param authorize necessita de autenticação?
   */
  private async makeGet<T>(endpoint: string, params: any, model: ClassConstructor<T>): Promise<any> {
    const res = await this.http.get(this.buildURL(endpoint), { params }).toPromise();
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
