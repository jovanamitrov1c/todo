import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Todo } from 'src/app/models/todo.model';
import { DeleteTodo, ToggleDone, UpdateTodo } from 'src/app/store/todo.actions';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { Subject, filter, takeUntil } from 'rxjs';
import { getDialogConfig } from 'src/app/util/dialog-config';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnDestroy {
  @Input() todo: Todo;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  delete(id: string) {
    this.store.dispatch(new DeleteTodo(id));
  }

  edit(todo: Todo) {
    const data = {
      todo,
      isEdit: true,
    };
    const dialogRef = this.dialog.open(
      AddDialogComponent,
      getDialogConfig(data)
    );

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
        filter((result) => !!result)
      )
      .subscribe((todo) => this.store.dispatch(new UpdateTodo(todo)));
  }

  toggleDone(id: string) {
    this.store.dispatch(new ToggleDone(id));
  }
}
