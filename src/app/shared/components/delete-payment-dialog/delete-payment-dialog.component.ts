import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IPayments } from "../../interfaces/Payments";
import { PaymentsService } from "../../services/payments.service";
import { AddPaymentDialogComponent } from "../add-payment-dialog/add-payment-dialog.component";

@Component({
  selector: "app-delete-payment-dialog",
  templateUrl: "./delete-payment-dialog.component.html",
  styleUrls: ["./delete-payment-dialog.component.scss"],
})
export class DeletePaymentDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPayments,
    public dialogRef: MatDialogRef<AddPaymentDialogComponent>,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {}

  deletePayment(): void {
    this.paymentsService.deletePayment(this.data.id).subscribe();

    this.dialogRef.close();
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
