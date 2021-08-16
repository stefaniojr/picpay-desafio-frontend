import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaskModel } from "src/app/models/task-model";

@Component({
  selector: "app-delete-confirm",
  templateUrl: "./delete-confirm.component.html",
  styleUrls: ["./delete-confirm.component.scss"],
})
export class DeleteConfirmComponent implements OnInit {
  task: TaskModel;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: TaskModel,
    public dialogRef: MatDialogRef<DeleteConfirmComponent>
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
