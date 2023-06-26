import { Todo } from '../models/todo.model';

export class AddTodo {
  static readonly type = '[Todo] Add';

  constructor(public todo: Todo) {}
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete';

  constructor(public id: string) {}
}

export class ToggleDone {
  static readonly type = '[Todo] Toggle done';

  constructor(public id: string) {}
}
