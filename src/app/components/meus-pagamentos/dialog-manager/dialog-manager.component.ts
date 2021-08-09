import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-dialog-manager',
  templateUrl: './dialog-manager.component.html',
  styleUrls: ['./dialog-manager.component.scss']
})
export class DialogManagerComponent {

  name: string = ''
  value: number
  date: Date
  title: string = ''

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      width: '550px',
      data: { name: this.name, value: this.value, date: this.date, title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-template',
  templateUrl: 'dialog-template.component.html',
  styleUrls: ['./dialog-manager.component.scss']
})
export class DialogTemplateComponent {

  maxDatepickerFilter: Date

  pagamentoForm: FormGroup = this.formBuilder.group({
    nameControl: ['', [Validators.required, Validators.minLength(3)]],
    valueControl: ['', Validators.required],
    dateControl: ['', Validators.required],
    titleControl: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task, private formBuilder: FormBuilder) {

    this.maxDatepickerFilter = new Date()

  }

  get name() { return this.pagamentoForm.get('nameControl'); }
  get value() { return this.pagamentoForm.get('valueControl'); }
  get date() { return this.pagamentoForm.get('dateControl'); }
  get title() { return this.pagamentoForm.get('titleControl'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit = () => {
  }

}