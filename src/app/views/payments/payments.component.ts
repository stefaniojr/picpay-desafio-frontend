import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { IPayments } from "src/app/shared/interfaces/Payments";
import { PaymentsService } from "src/app/shared/services/payments.service";
import { MatDialog } from "@angular/material/dialog";
import { AddPaymentDialogComponent } from "src/app/shared/components/add-payment-dialog/add-payment-dialog.component";
import { DeletePaymentDialogComponent } from "src/app/shared/components/delete-payment-dialog/delete-payment-dialog.component";

registerLocaleData(localePt, "pt");

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  dataSource: IPayments[] = null;
  payments: number;
  pageEvent: PageEvent;
  displayedColumns: string[] = [
    "name",
    "title",
    "date",
    "value",
    "isPayed",
    "settings",
  ];

  constructor(
    public paymentsService: PaymentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  addPayment(): void {
    const dialogRef = this.dialog.open(AddPaymentDialogComponent, {
      minWidth: "400px",
    });

    dialogRef.afterClosed().subscribe();
  }

  deletePayment(payment): void {
    const dialogRef = this.dialog.open(DeletePaymentDialogComponent, {
      minWidth: "400px",
      data: payment,
    });

    dialogRef.afterClosed().subscribe();
  }

  initDataSource() {
    this.paymentsService
      .getAllPayments()
      .pipe(map((payments) => (this.payments = payments.length)))
      .subscribe();

    this.paymentsService
      .getPayments(1, 5)
      .pipe(map((payments: IPayments[]) => (this.dataSource = payments)))
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    this.paymentsService
      .getPayments(page, size)
      .pipe(map((payments: IPayments[]) => (this.dataSource = payments)))
      .subscribe();
  }
}
