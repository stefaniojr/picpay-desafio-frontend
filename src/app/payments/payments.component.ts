import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public tasks: Array<Task>;
  public profile_data: any;

  constructor(private auth: AuthService, private api: ApiService, private storage: StorageService) {}

  async ngOnInit() {
    this.tasks = await this.api.getTasks();
    this.storage.get('token').then(data => this.profile_data = data.user);
  }

  public async logout() {
    // logout da aplicação.
    await this.auth.logout();
  }
}
