import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../models/todo';
import { TodoStateService } from 'src/app/services/todo-state.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {  

  constructor(public stateService: TodoStateService) { }

  ngOnInit(): void {
    this.stateService.loadTodos();
  }

  editTodo(todo: Todo, value: string): void {
    const editedTodo = {
      ...todo,
      title: value
    }
    this.stateService.updateTodo(editedTodo);
  }

  // TrackBy function to improve performance
  trackByFn(index: number, todo: Todo): number {
    return todo.id!;
  }
}
