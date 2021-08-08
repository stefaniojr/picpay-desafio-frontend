import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task';

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

  constructor(
    public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearInput = (inputName: string) => {
    this.data[inputName] = undefined
  }

}