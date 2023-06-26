import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/app/models/todo.model';
import { getId } from 'src/app/util/id-generator';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  todoForm: FormGroup;
  currentTodo: Todo;

  constructor(
    @Inject(MAT_DIALOG_DATA) { todo, isEdit }: any,
    private readonly dialogRef: MatDialogRef<AddDialogComponent>
  ) {
    this.todoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
    isEdit ? this.populateFields(todo) : this.initTodo();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const todo = {
      ...this.currentTodo,
      ...this.todoForm.getRawValue(),
    };
    this.todoForm.valid && this.dialogRef.close(todo);
  }

  private initTodo(): void {
    this.currentTodo = {
      id: getId(),
      title: '',
      isDone: false,
    };
  }

  private populateFields(todo: Todo) {
    this.currentTodo = todo;
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
    });
  }
}
