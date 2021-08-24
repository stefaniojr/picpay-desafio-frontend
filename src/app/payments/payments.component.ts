import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import { Payment } from "./models/payment.model";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  public payments: Array<Payment> = [];
  public profileData: any;
  pageEvent: PageEvent;

  paymentObj: Payment = new Payment(); // objeto auxiliar
  paymentToDelete: Payment = new Payment(); // para criar cópia a ser passada via modal;

  formValue!: FormGroup;

  dataSource: MatTableDataSource<Payment>;
  columns: Array<string> = [
    "username",
    "title",
    "date",
    "value",
    "isPayed",
    "actions",
  ]; // colunas necessárias para a tabela

  public isEditing = false; // variavel de controle

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private storage: StorageService,
    private fb: FormBuilder
  ) {
    this.storage.get("token").then((data) => (this.profileData = data.user)); // recupera dados do usuário logado do local storage.
  }

  async ngOnInit() {
    this.formValue = this.fb.group({
      id: new FormControl(this.paymentObj.id),
      name: new FormControl(this.paymentObj.name, Validators.required),
      username: new FormControl(this.paymentObj.username, Validators.required),
      title: new FormControl(this.paymentObj.title),
      value: new FormControl(this.paymentObj.value, Validators.required),
      date: new FormControl(this.paymentObj.date, Validators.required),
      image: new FormControl(this.paymentObj.image),
      isPayed: new FormControl(this.paymentObj.isPayed),
    });
    this.setPayments();
  }

  clickAddPayment() {
    this.isEditing = false; // entra em modo edição
    this.formValue.reset(); // reseta o form
  }

  /**
   * Recupera pagamentos da api para a tabela
   */
  setPayments() {
    // recupera dados para a tabela e possibilita ordenação e paginação.
    this.api.getPayments().then((response) => {
      this.payments = response;

      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Inicia um novo pagamento e carrega para a API
   */
  async newPayment() {
    // passa valores do form para o objeto auxiliar.
    this.formToObj();

    try {
      const response = await this.api.addPayment(this.paymentObj);
      alert("Adicionado!");
      // fecha o modal
      let ref = document.getElementById("cancelPayment");
      ref?.click();
      this.formValue.reset(); // reseta o form
      // atualiza lista de pagamentos
      this.setPayments();
    } catch (e) {
      alert("Algo deu errado. Tente novamente!");
    }
  }

  onDelete(row: Payment) {
    this.paymentToDelete = row;
  }

  /**
   * Remove um pagamento e fecha o modal
   */
  async removePayment() {
    try {
      const response = await this.api.deletePayment(this.paymentToDelete);
      // fecha o modal
      let ref = document.getElementById("cancelDeletePayment");
      ref?.click();
      // atualiza lista de pagamentos
      this.setPayments();
    } catch (e) {
      alert("Algo deu errado. Tente novamente!");
    }
  }

  onEdit(row: Payment) {
    this.isEditing = true; // entra em modo de edição
    this.rowToForm(row); // passa os dados da linha para um form
    this.formValue.controls["date"].setValue(row.date.replace("Z", "")); // datetime input não aceita formato com Z no final
  }

  /**
   * Passa itens da linha selecionada para o form
   * @param linha da tabela selecionada
   */
  rowToForm(row: Payment) {
    // setando valores da tabela selecionada
    this.formValue.controls["id"].setValue(row.id);
    this.formValue.controls["name"].setValue(row.name);
    this.formValue.controls["username"].setValue(row.username);
    this.formValue.controls["title"].setValue(row.title);
    this.formValue.controls["value"].setValue(row.value);
    this.formValue.controls["date"].setValue(row.date);
    this.formValue.controls["image"].setValue(row.image);
    this.formValue.controls["isPayed"].setValue(row.isPayed);
  }

  /**
   * Passa os dados do form para o objeto auxiliar
   */
  formToObj() {
    // atualizando valores editados no modal
    this.paymentObj.id = this.formValue.value.id;
    this.paymentObj.name = this.formValue.value.name;
    this.paymentObj.username = this.formValue.value.username;
    this.paymentObj.title = this.formValue.value.title;
    this.paymentObj.value = this.formValue.value.value;
    this.paymentObj.date = this.formValue.value.date + "Z"; // formato do datetime input não traz o Z no final
    this.paymentObj.image = this.formValue.value.image;
    this.paymentObj.isPayed = this.formValue.value.isPayed;
  }

  /**
   * Edita os campos de um pagamento e dá um put na API
   */
  async changePayment() {
    this.formToObj();

    try {
      const response = await this.api.updatePayment(this.paymentObj);
      alert("Atualizado!");
      // fecha o modal
      let ref = document.getElementById("cancelPayment");
      ref?.click();
      this.formValue.reset(); // reset forma
      // atualiza lista de pagamentos
      this.setPayments();
    } catch (e) {
      alert("Algo deu errado. Tente novamente!");
    }
  }

  /**
   * Filtra a pesquisa
   */
  filter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // filtra a pesquisa
  }

  /**
   * Atualiza o checkbox na API
   * @param evento do checkbox
   * @param linha selecionada
   */
  async onChangeCheckBox(event, row: Payment) {
    // constroi objeto com os valores da linha
    row.isPayed = event.target.checked;
    this.rowToForm(row);
    this.formToObj();
    // extra: removendo Z a mais.
    this.paymentObj.date = this.paymentObj.date.slice(0, -1);

    try {
      const response = await this.api.updatePayment(this.paymentObj);
      // atualiza pagamentos
      this.setPayments();
    } catch (e) {
      alert("Algo deu errado. Tente novamente!");
    }
  }

  public async logout() {
    // logout da aplicação.
    await this.auth.logout();
  }
}
