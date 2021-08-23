import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Task } from './models/task.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  public isLoading = false; // variável de controle para indicar carregamento

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
      name: [''],
      username: [''],
      title: [''],
      value: [''],
      date: [''],
      image: [''],
      isPayed: false,
    });
    // recupera dados para a tabela e possibilita ordenação e paginação.
    this.api.getPayments().then((response) => {
      this.payments = response;
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  clickAddPayment() {
    this.isEditing = false; // entra em modo edição
    this.formValue.reset(); // reseta o form
  }

  newPayment() {
    // passa valores do form para o objeto auxiliar.
    this.paymentObj.name = this.formValue.value.name;
    this.paymentObj.username = this.formValue.value.username;
    this.paymentObj.title = this.formValue.value.title;
    this.paymentObj.value = this.formValue.value.value;
    this.paymentObj.date = this.formValue.value.date;

    try {
      const response = this.api.addPayment(this.paymentObj);
      alert('Adicionado!');
      // fecha o modal
      let ref = document.getElementById('cancelPayment');
      ref?.click();
      this.formValue.reset(); // reseta o form
      // atualiza lista de pagamentos
      this.api.getPayments().then((response) => {
        this.payments = response;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (e) {
      alert('Algo deu errado. Tente novamente!');
    }
  }

  onDelete(row: Task) {
    this.paymentToDelete = row;
    console.log(this.paymentToDelete);
  }

  removePayment() {
    try {
      const response = this.api.deletePayment(this.paymentToDelete);
      // fecha o modal
      let ref = document.getElementById('cancelDeletePayment');
      ref?.click();
      // atualiza lista de pagamentos
      this.api.getPayments().then((response) => {
        this.payments = response;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (e) {
      alert('Algo deu errado. Tente novamente!');
    }
  }

  onEdit(row: Task) {
    this.isEditing = true;
    // setando valores da tabela selecionada
    this.paymentObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['value'].setValue(row.value);
    this.formValue.controls['date'].setValue(row.date);
    this.formValue.controls['image'].setValue(row.image);
    this.formValue.controls['isPayed'].setValue(row.isPayed);
  }

  changePayment() {
    // atualizando valores editados no modal
    this.paymentObj.name = this.formValue.value.name;
    this.paymentObj.username = this.formValue.value.username;
    this.paymentObj.title = this.formValue.value.title;
    this.paymentObj.value = this.formValue.value.value;
    this.paymentObj.date = this.formValue.value.date;

    try {
      const response = this.api.updatePayment(this.paymentObj);
      alert('Atualizado!');
      // fecha o modal
      let ref = document.getElementById('cancelPayment');
      ref?.click();
      this.formValue.reset(); // reset forma
      // atualiza lista de pagamentos
      this.api.getPayments().then((response) => {
        this.payments = response;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangeCheckBox(event, row: Task){
    this.paymentObj.id = row.id;
    this.paymentObj.name = row.name;
    this.paymentObj.username = row.username;
    this.paymentObj.title = row.title;
    this.paymentObj.value = row.value;
    this.paymentObj.date = row.date;
    this.paymentObj.image = row.image;
    this.paymentObj.isPayed = event.target.checked;

    try {
      const response = this.api.updatePayment(this.paymentObj);
      
      this.api.getPayments().then((response) => {
        this.payments = response;
        this.dataSource = new MatTableDataSource(this.payments);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (e) {
      alert('Algo deu errado. Tente novamente!');
    }

  }
  
}
