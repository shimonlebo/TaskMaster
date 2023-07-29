import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EditTodo, GetTodos, RemoveTodo, ToggleCompleted } from '../../todos/todo.state';
import { Observable, map } from 'rxjs';
import { Todo } from '../../../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Select((state: { todos: { todos: Todo[] } }) => state.todos.todos)
  todos$: Observable<Todo[]>;

  completedTodos$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetTodos());

    this.completedTodos$ = this.todos$.pipe(
      map(todos => todos.filter(todo => todo.isComplete).length)
    );
  }

  editTodo(todo: Todo, value: string): void {
    const editedTodo = {
      ...todo,
      title: value
    }
    this.store.dispatch(new EditTodo(editedTodo));
  }

  deleteTodo(id: number): void {
    this.store.dispatch(new RemoveTodo(id));
  }

  toggleIsComplete(id: number): void {
    this.store.dispatch(new ToggleCompleted(id));
  }

  // TrackBy function to improve performance
  trackByFn(index: number, todo: Todo): number {
    return todo.id!;
  }
}
