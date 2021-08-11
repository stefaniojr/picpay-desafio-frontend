import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";
import { PaymentsService } from "../../services/payments.service";

@Component({
  selector: "app-add-payment-dialog",
  templateUrl: "./add-payment-dialog.component.html",
  styleUrls: ["./add-payment-dialog.component.scss"],
})
export class AddPaymentDialogComponent implements OnInit {
  public addPaymentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPaymentDialogComponent>,
    private formBuilder: FormBuilder,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.addPaymentForm = this.formBuilder.group({
      user: ["", [Validators.required]],
      value: ["", [Validators.required]],
      date: [moment().toISOString(true), [Validators.required]],
      title: "",
      username: "Username",
      image:
        "https://robohash.org/illumexpeditadeleniti.png?size=150x150&set=set1",
      isPayed: true,
    });
  }

  createPayment() {
    this.paymentsService.postPayment(this.addPaymentForm.value).subscribe();

    this.dialogRef.close();
    this.addPaymentForm.reset();
    window.location.reload();
  }

  cancel(): void {
    this.dialogRef.close();
    this.addPaymentForm.reset();
  }
}
