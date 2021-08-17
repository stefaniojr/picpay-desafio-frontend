import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TaskModel } from "src/app/models/task-model";

@Component({
  selector: "app-modal-create",
  templateUrl: "./modal-create.component.html",
  styleUrls: ["./modal-create.component.scss"],
})
export class ModalCreateComponent implements OnInit {
  task: TaskModel;
  isCreate: boolean;

  name: string = "";
  value: string = "";
  date: Date = new Date();
  complete: Boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: TaskModel,
    private dialogRef: MatDialogRef<ModalCreateComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.id !== null) {
      this.isCreate = false;
    } else {
      this.isCreate = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  changeName(event) {
    this.name = event;
    this.changeComplete();
  }

  changeValue(event) {
    this.value = event;
    this.changeComplete();
    console.log(this.complete);
  }

  changeDate(event) {
    this.date = event;
    this.changeComplete();
  }

  changeComplete() {
    if (this.date && this.name.length > 3 && Number(this.value) > 0) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }
}
