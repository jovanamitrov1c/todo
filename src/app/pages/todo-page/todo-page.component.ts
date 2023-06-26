import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { AddDialogComponent } from 'src/app/components/add-dialog/add-dialog.component';
import { Todo } from 'src/app/models/todo.model';
import { AddTodo } from 'src/app/store/todo.actions';
import { TodoState } from 'src/app/store/todo.state';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnDestroy {
  @Select(TodoState.currentTodos) todos$: Observable<Todo[]>;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {
    this.todos$.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  openModal() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      minWidth: 400,
      minHeight: 200,
      autoFocus: false,
      data: { isEdit: false },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
        filter((result) => !!result)
      )
      .subscribe((todo) => this.store.dispatch(new AddTodo(todo)));
  }
}
