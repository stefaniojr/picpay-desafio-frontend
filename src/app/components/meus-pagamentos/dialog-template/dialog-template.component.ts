import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'dialog-template',
  templateUrl: 'dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {

  maxDatepickerFilter: Date
  dialogTitle: string = ''
  buttonText: string = 'Salvar'

  pagamentoForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    value: ['', Validators.required],
    date: ['', Validators.required],
    title: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private taskService: TaskService,
    private tostr: ToastrService) {

    this.maxDatepickerFilter = new Date()

  }
  ngOnInit(): void {
    if (this.data.operation === 'edit') {
      this.dialogTitle = 'Editar'
      this.pagamentoForm.patchValue(this.data.task)
    }
    if (this.data.operation === 'delete') {
      this.dialogTitle = 'Deletar'
      this.buttonText = 'Deletar'
    }
  }

  get name() { return this.pagamentoForm.get('name'); }
  get value() { return this.pagamentoForm.get('value'); }
  get date() { return this.pagamentoForm.get('date'); }
  get title() { return this.pagamentoForm.get('title'); }

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

  editTask = (task: Task) => {
    this.taskService.update(task).subscribe(
      response => {
        this.dialogRef.close()
        this.tostr.success('Editado com sucesso', 'Sucesso')
      },
      error => { this.tostr.error('Falha ao editar', 'Erro') }
    )
  }

  deleteTask = () => {
    this.taskService.delete(this.data.task).subscribe(
      response => {
        this.dialogRef.close()
        this.tostr.success('Deletado com sucesso', 'Sucesso')
      },
      error => { this.tostr.error('Falha ao deletar', 'Erro') }
    )
  }

  generateNewTask = () => {
    const newTask = new Task()
    newTask.name = this.name.value
    newTask.title = this.title.value
    newTask.value = this.value.value
    newTask.date = this.formatDate(this.date.value)
    return newTask
  }

  generateUpdatedTask = () => {
    return {
      ...this.data.task,
      name: this.name.value,
      value: this.value.value,
      date: this.formatDate(this.date.value),
      title: this.title.value,
    }
  }

  formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('.')[0] + 'Z'
  }

  isOperationCreate = () => this.data.operation === 'create'
  isOperationEdit = () => this.data.operation === 'edit'
  isOperationDelete = () => this.data.operation === 'delete'
  isNotOperationDelete = () => !this.isOperationDelete()

  onSubmit = () => {

    if (this.isOperationCreate()) {
      this.addTask(this.generateNewTask())
    }
    if (this.isOperationEdit()) {
      this.editTask(this.generateUpdatedTask())
    }

    if (this.isOperationDelete()) {
      this.deleteTask()
    }

  }

}