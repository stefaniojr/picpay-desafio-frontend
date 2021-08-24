import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Task } from './models/task.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public payments: Array<Task> = [];
  public profileData: any;
  pageEvent: PageEvent;

  paymentObj: Task = new Task(); // objeto auxiliar
  paymentToDelete: Task = new Task(); // para criar cópia a ser passada via modal;

  formValue!: FormGroup;

  dataSource: MatTableDataSource<Task>;
  columns: Array<string> = ['username', 'title', 'date', 'value', 'isPayed', 'actions']; // colunas necessárias para a tabela

  public isEditing = false; // variavel de controle

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private storage: StorageService,
    private fb: FormBuilder
  ) {
    this.storage.get('token').then((data) => (this.profileData = data.user)); // recupera dados do usuário logado do local storage.
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

  setPayments() {
    // recupera dados para a tabela e possibilita ordenação e paginação.
    this.api.getPayments().then((response) => {
      this.payments = response;
      
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  async newPayment() {
    // passa valores do form para o objeto auxiliar.
    this.formToObj();

    try {
      const response = await this.api.addPayment(this.paymentObj);
      alert('Adicionado!');
      // fecha o modal
      let ref = document.getElementById('cancelPayment');
      ref?.click();
      this.formValue.reset(); // reseta o form
      // atualiza lista de pagamentos
      this.setPayments();
    } catch (e) {
      alert('Algo deu errado. Tente novamente!');
    }
  }

  onDelete(row: Task) {
    this.paymentToDelete = row;
  }

  async removePayment() {
    try {
      const response = await this.api.deletePayment(this.paymentToDelete);
      // fecha o modal
      let ref = document.getElementById('cancelDeletePayment');
      ref?.click();
      // atualiza lista de pagamentos
      this.setPayments();
    } catch (e) {
      alert('Algo deu errado. Tente novamente!');
    }
  }

  onEdit(row: Task) {
    this.isEditing = true; // entra em modo de edição
    row.date = row.date.replace("Z", ""); // datetime input não aceita formato com Z no final
    this.rowToForm(row); // passa os dados da linha para um form
  }

  rowToForm(row: Task) {
    // setando valores da tabela selecionada
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['value'].setValue(row.value);
    this.formValue.controls['date'].setValue(row.date);
    this.formValue.controls['image'].setValue(row.image);
    this.formValue.controls['isPayed'].setValue(row.isPayed);
  }

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

  async changePayment() {
    this.formToObj();

    try {
      const response = await this.api.updatePayment(this.paymentObj);
      alert('Atualizado!');
      // fecha o modal
      let ref = document.getElementById('cancelPayment');
      ref?.click();
      this.formValue.reset(); // reset forma
      // atualiza lista de pagamentos
      this.setPayments();
    } catch (e) {
      alert('Algo deu errado. Tente novamente!');
    }
  }

  public async logout() {
    // logout da aplicação.
    await this.auth.logout();
  }

  filter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // filtra a pesquisa
  }

  async onChangeCheckBox(event, row: Task) {
    // constroi objeto com os valores da linha
    row.isPayed = event.target.checked;
    this.rowToForm(row);
    this.formToObj();

    try {
      const response = await this.api.updatePayment(this.paymentObj);
      // atualiza pagamentos
      this.setPayments();
    } catch (e) {
      alert('Algo deu errado. Tente novamente!');
    }
  }

}
