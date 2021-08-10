
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';

@Component({
  selector: 'app-dialog-manager',
  templateUrl: './dialog-manager.component.html',
  styleUrls: ['./dialog-manager.component.scss']
})
export class DialogManagerComponent {

  @Input() task: Task
  @Input() operation: string = ''
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTemplateComponent, {
      width: '550px',
      data: { task: this.task, operation: this.operation }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

