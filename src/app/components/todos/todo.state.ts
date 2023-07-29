import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Todo } from '../../models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { Injectable } from '@angular/core';

// define the shape of your state
export interface TodoStateModel {
  todos: Todo[];
}

// define the actions that can be performed on the state
export class GetTodos {
  static readonly type = '[Todo] Get';
}

export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public payload: { title: string }) { }
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove';
  constructor(public payload: number) { }
}

export class EditTodo {
  static readonly type = '[Todo] Edit';
  constructor(public payload: Todo) { }
}

export class ToggleCompleted {
  static readonly type = '[Todo] Toggle Completed';
  constructor(public payload: number) { }
}

// define the state
@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: []
  }
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) { }

  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  @Action(GetTodos)
  get(ctx: StateContext<TodoStateModel>) {
    return this.todoService.getTodos().subscribe(todos => {
      ctx.patchState({ todos });
    });
  }

  @Action(AddTodo)
  add(ctx: StateContext<TodoStateModel>, action: AddTodo) {
    this.todoService.createTodo(action.payload).subscribe(todo => {
      const state = ctx.getState();
      ctx.patchState({
        todos: [...state.todos, todo]
      });
    });
  }

  // Edit a task in the state
  @Action(EditTodo)
  edit(ctx: StateContext<TodoStateModel>, action: EditTodo) {
    this.todoService.updateTodo(action.payload).subscribe(() => {
      const state = ctx.getState();
      // update the state with the task edited
      ctx.patchState({
        todos: state.todos.map(t => {
          if (t.id === action.payload.id) {
            return {
              ...t,
              ...action.payload
            }
          }
          return t;
        })
      });
    });
  }

  // Remove a task from the state
  @Action(RemoveTodo)
  remove(ctx: StateContext<TodoStateModel>, action: RemoveTodo) {
    this.todoService.deleteTodo(action.payload).subscribe(() => {
      const state = ctx.getState();
      // update the state with the task removed
      ctx.patchState({
        todos: state.todos.filter(t => t.id !== action.payload)
      });
    });
  }

  // Toggle the completed status of a task
  @Action(ToggleCompleted)
  toggleCompleted(ctx: StateContext<TodoStateModel>, action: ToggleCompleted) {
    const state = ctx.getState();
    const todoToToggle = state.todos.find(t => t.id === action.payload);

    if (todoToToggle) {
      const updatedTodo: Todo = { ...todoToToggle, isComplete: !todoToToggle.isComplete };
      this.todoService.updateTodo(updatedTodo).subscribe(() => {
        ctx.patchState({
          todos: state.todos.map(t => {
            return t.id === action.payload ? updatedTodo : t;
          })
        });
      });
    }
  }
}