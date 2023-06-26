import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todos$: Observable<Todo[]>;

  isOpened = false;
}
