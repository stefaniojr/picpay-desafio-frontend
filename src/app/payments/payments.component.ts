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

  formValue !: FormGroup;

  dataSource: MatTableDataSource<Task>;
  columns: Array<string> = ['username', 'title', 'date', 'value', 'isPayed', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private auth: AuthService, private api: ApiService, private storage: StorageService, private fb: FormBuilder) {
    this.storage.get('token').then((data) => (this.profileData = data.user));
  }

  async ngOnInit() {
    this.formValue = this.fb.group({
      id: null,
      name: [''],
      username: [''],
      title: [''],
      value: null,
      date: [''],
      image: [''],
      isPayed: null
    });
    
    this.api.getTasks().then(
      response =>{
        this.tasks = response;
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
    
  }

  public async logout() {
    // logout da aplicação.
    await this.auth.logout();
  }

  filter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}