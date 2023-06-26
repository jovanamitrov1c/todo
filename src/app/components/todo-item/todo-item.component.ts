import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Todo } from 'src/app/models/todo.model';
import { DeleteTodo, ToggleDone } from 'src/app/store/todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: Todo;

  constructor(private readonly store: Store) {}

  delete(id: string) {
    this.store.dispatch(new DeleteTodo(id));
  }

  toggleDone(id: string) {
    this.store.dispatch(new ToggleDone(id));
  }
}
