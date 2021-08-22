import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  public tasks: Array<Task>;

  constructor(private auth: AuthService, private api: ApiService) {}

  async ngOnInit() {
    this.tasks = await this.api.getTasks();
  }

  public async logout() {
    // logout da aplicação.
    await this.auth.logout();
  }
}
