import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Todo } from 'src/app/models/todo.model';
import { AddTodo } from 'src/app/store/todo.actions';
import { getId } from 'src/app/util/id-generator';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent {
  todoTitleFormControl: FormControl;

  constructor(
    private readonly dialogRef: MatDialogRef<AddDialogComponent>,
    private readonly store: Store
  ) {
    this.todoTitleFormControl = new FormControl();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    const todo: Todo = {
      id: getId(),
      title: this.todoTitleFormControl.getRawValue(),
      isDone: false,
    };
    this.store.dispatch(new AddTodo(todo));
    this.dialogRef.close();
  }
}
