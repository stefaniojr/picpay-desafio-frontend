import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { IPayments } from "src/app/shared/interfaces/Payments";
import { PaymentsService } from "src/app/shared/services/payments.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  dataSource: IPayments[] = null;
  pageEvent: PageEvent;
  displayedColumns: string[] = ["name", "title", "date", "value", "isPayed"];

  constructor(public paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.paymentsService
      .getPayments(1, 5)
      .pipe(
        tap((payments) => console.table(payments)),
        map((payments: IPayments[]) => (this.dataSource = payments))
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    console.log(page, size);

    this.paymentsService
      .getPayments(page, size)
      .pipe(map((payments: IPayments[]) => (this.dataSource = payments)))
      .subscribe();
  }
}
