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
  public tasks: Array<Task> = [];
  public profileData: any;
  pageEvent: PageEvent;

  taskObj: Task = new Task();
  paymentToDelete: Task = new Task(); // para criar cópia a ser passada via modal;

  formValue!: FormGroup;

  dataSource: MatTableDataSource<Task>;
  columns: Array<string> = ['username', 'title', 'date', 'value', 'isPayed', 'actions'];

  public isEditing = false; // variavel de controle

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private storage: StorageService,
    private fb: FormBuilder
  ) {
    this.storage.get('token').then((data) => (this.profileData = data.user));
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

    this.api.getTasks().then((response) => {
      this.tasks = response;
      this.dataSource = new MatTableDataSource(this.tasks);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  clickAddPayment() {
    this.isEditing = false;
    this.formValue.reset(); // reseta o form
  }

  newPayment() {
    this.taskObj.name = this.formValue.value.name;
    this.taskObj.username = this.formValue.value.username;
    this.taskObj.title = this.formValue.value.title;
    this.taskObj.value = this.formValue.value.value;
    this.taskObj.date = this.formValue.value.date;

    try {
      const response = this.api.addPayment(this.taskObj);
      alert('Adicionado!');
      // fecha o modal
      let ref = document.getElementById('cancelPayment');
      ref?.click();
      this.formValue.reset(); // reseta o form
      // atualiza lista de pagamentos
      this.api.getTasks().then((response) => {
        this.tasks = response;
        this.dataSource = new MatTableDataSource(this.tasks);
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
      this.api.getTasks().then((response) => {
        this.tasks = response;
        this.dataSource = new MatTableDataSource(this.tasks);
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
    this.taskObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['value'].setValue(row.value);
    this.formValue.controls['date'].setValue(row.date);
  }

  changePayment() {
    // atualizando valores editados no modal
    this.taskObj.name = this.formValue.value.name;
    this.taskObj.username = this.formValue.value.username;
    this.taskObj.title = this.formValue.value.title;
    this.taskObj.value = this.formValue.value.value;
    this.taskObj.date = this.formValue.value.date;

    try {
      const response = this.api.updatePayment(this.taskObj);
      alert('Atualizado!');
      // fecha o modal
      let ref = document.getElementById('cancelPayment');
      ref?.click();
      this.formValue.reset(); // reset forma
      // atualiza lista de pagamentos
      this.api.getTasks().then((response) => {
        this.tasks = response;
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } catch (e) {
      console.log('something went wrong...');
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
}
