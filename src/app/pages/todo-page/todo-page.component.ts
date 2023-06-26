import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddDialogComponent } from 'src/app/components/add-dialog/add-dialog.component';
import { Todo } from 'src/app/models/todo.model';
import { TodoState } from 'src/app/store/todo.state';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent {
  @Select(TodoState.currentTodos) todos$: Observable<Todo[]>;

  constructor(private readonly dialog: MatDialog) {}

  openModal() {
    this.dialog.open(AddDialogComponent, {
      minWidth: 400,
      minHeight: 200,
      autoFocus: false,
    });
  }
}
