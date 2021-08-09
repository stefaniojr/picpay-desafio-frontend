import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'dialog-template',
  templateUrl: 'dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
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
    @Inject(MAT_DIALOG_DATA) public data: Task, private formBuilder: FormBuilder, private taskService: TaskService,
    private tostr: ToastrService) {

    this.maxDatepickerFilter = new Date()

  }

  get name() { return this.pagamentoForm.get('nameControl'); }
  get value() { return this.pagamentoForm.get('valueControl'); }
  get date() { return this.pagamentoForm.get('dateControl'); }
  get title() { return this.pagamentoForm.get('titleControl'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTask = (task: Task) => {
    this.taskService.add(task).subscribe(
      response => {
        this.dialogRef.close()
        this.tostr.success('Salvo com sucesso', 'Sucesso')
      },
      error => { this.tostr.error('Falha ao salvar', 'Erro') }
    )
  }

  onSubmit = () => {

    const newTask = new Task()

    newTask.name = this.name.value
    newTask.value = this.value.value
    newTask.date = new Date(this.date.value).toISOString()
    newTask.title = this.title.value

    this.addTask(newTask)

  }

}