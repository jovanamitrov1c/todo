import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Todo } from '../models/todo.model';
import { AddTodo, DeleteTodo, ToggleDone } from './todo.actions';
import { Injectable } from '@angular/core';

interface TodoStateModel {
  currentTodos: Todo[];
}

const defaultState: TodoStateModel = {
  currentTodos: [],
};

@State<TodoStateModel>({
  name: 'todo',
  defaults: defaultState,
})
@Injectable()
export class TodoState {
  @Action(AddTodo)
  public addTodo(
    { patchState, getState }: StateContext<TodoStateModel>,
    { todo }: AddTodo
  ) {
    const { currentTodos } = getState();
    patchState({ currentTodos: [...currentTodos, todo] });
  }

  @Action(DeleteTodo)
  public deleteTodo(
    { patchState, getState }: StateContext<TodoStateModel>,
    { id }: DeleteTodo
  ) {
    const { currentTodos } = getState();
    const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
    patchState({ currentTodos: updatedTodos });
  }

  @Action(ToggleDone)
  public toggleDone(
    { patchState, getState }: StateContext<TodoStateModel>,
    { id }: ToggleDone
  ) {
    const { currentTodos } = getState();
    const updatedTodos = currentTodos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
    });
  }

  @Selector()
  static currentTodos({ currentTodos }: TodoStateModel) {
    return currentTodos;
  }
}
