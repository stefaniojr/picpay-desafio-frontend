import { Injectable } from "@angular/core";
import { Token } from "../login/models/token.model";
import { plainToClass } from "class-transformer";
import { ClassConstructor } from "class-transformer";
import { HttpClient } from "@angular/common/http";
import { Payment } from "../payments/models/payment.model";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(public http: HttpClient) {}
  /**
   * URLS
   */
  public static LOGIN_URL = "login/";
  public static TASKS_URL = "tasks/";

  /**
   * Método para atualizar o pagamento
   * @param pagamento
   */
  public async updatePayment(payment: Payment): Promise<any> {
    return await this.makePut(ApiService.TASKS_URL, payment, Payment);
  }

  /**
   * Método para cadastrar pagamento
   * @param pagamento
   */
  public async addPayment(payment: Payment): Promise<any> {
    return await this.makePost(ApiService.TASKS_URL, payment, Payment);
  }

  /**
   * Método para deletar um pagamento
   * @param pagamento
   */
  public async deletePayment(payment: Payment): Promise<any> {
    return await this.makeDelete(ApiService.TASKS_URL, payment, Payment);
  }

  /**
   * Método para realizar login
   * @param email do usuário
   * @param password senha
   */
  public async login(email: string, password: string): Promise<any> {
    return await this.makePost(
      ApiService.LOGIN_URL,
      { email, password },
      Token
    );
  }

  /**
   * Recupera as tasks para o usuário
   */
  public async getPayments(): Promise<Payment[]> {
    return await this.makeGet(ApiService.TASKS_URL, {}, Payment);
  }

  /**
   * Realiza uma requisição do tipo POST
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   */
  private async makePost<T>(
    endpoint: string,
    data: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http.post(this.buildURL(endpoint), data).toPromise();
    if (typeof (model as any).toClass === "function") {
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
   */
  private async makeGet<T>(
    endpoint: string,
    params: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http
      .get(this.buildURL(endpoint), { params })
      .toPromise();
    if (typeof (model as any).toClass === "function") {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Realiza uma requisição do tipo PUT
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   */
  private async makePut<T>(
    endpoint: string,
    data: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http
      .put(this.buildURL(endpoint) + data.id, data)
      .toPromise();
    if (typeof (model as any).toClass === "function") {
      return (model as any).toClass(res as any);
    } else {
      return plainToClass(model, res as any);
    }
  }

  /**
   * Realiza uma requisição do tipo DELETE
   * @param endpoint endpoint da API
   * @param data dados a serem submetidos
   * @param model modelo de retorno da requisição
   */
  private async makeDelete<T>(
    endpoint: string,
    data: any,
    model: ClassConstructor<T>
  ): Promise<any> {
    const res = await this.http
      .delete(this.buildURL(endpoint) + data.id, data)
      .toPromise();
    if (typeof (model as any).toClass === "function") {
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
    let baseURL = "http://localhost:3000/";
    return baseURL;
  }
}
