import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import {
  Observable,
  Subject,
  combineLatest,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { AddDialogComponent } from 'src/app/components/add-dialog/add-dialog.component';
import { Todo } from 'src/app/models/todo.model';
import { AddTodo } from 'src/app/store/todo.actions';
import { TodoState } from 'src/app/store/todo.state';
import { getDialogConfig } from 'src/app/functions/dialog-config';
import { FilterState } from 'src/app/store/filter.state';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnDestroy {
  @Select(TodoState.currentTodos)
  allTodos$: Observable<Todo[]>;

  @Select(FilterState.filters)
  filters$: Observable<Filter>;

  todos$: Observable<Todo[]>;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {
    this.todos$ = combineLatest([this.allTodos$, this.filters$]).pipe(
      map(([allTodos, filters]) => {
        if (!!filters.tags.length) {
          allTodos = allTodos.filter((todo) =>
            todo.tags.some((tag) => filters.tags.includes(tag.label))
          );
        }

        if (filters.title !== '') {
          allTodos = allTodos.filter((todo) =>
            todo.title.includes(filters.title)
          );
        }

        if (filters.isDone) {
          allTodos = allTodos.filter((todo) => todo.isDone);
        }

        return allTodos.sort((a, b) => (a.id > b.id ? -1 : 1));
      })
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  openModal() {
    const data = { isEdit: false };
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
      .subscribe((todo) => this.store.dispatch(new AddTodo(todo)));
  }
}
