import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  public async logout() {
    // logout da aplicação.
    await this.auth.logout();
  }
}
