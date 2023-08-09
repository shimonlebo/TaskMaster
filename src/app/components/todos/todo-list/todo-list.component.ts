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

  ngOnInit() {
    this.stateService.loadTodos();
  }

  edit(todo: Todo, value: string) {
    const editedTodo = {
      ...todo,
      title: value
    }
    this.stateService.updateTodo(editedTodo);
  }

  delete(id: number) {
    this.stateService.deleteTodo(id);
  }

  toggleCompleted(id: number) {
    this.stateService.toggleIsComplete(id);
  }

  // TrackBy function to improve performance
  trackByFn(index: number, todo: Todo) {
    return todo.id!;
  }
}
