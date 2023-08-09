import { Injectable, computed, signal } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoApiService } from './todo-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoStateService {
  todos = signal<Todo[]>([]);
  loading = signal(false);
  error = signal('');  
  completedTodos = computed(() => this.todos().filter((todo) => todo.isComplete).length ?? 0);
  
  constructor(private apiService: TodoApiService) {}  

  // Load todos from the server
  loadTodos() {
    this.loading.set(true);
    this.apiService.getTodos().subscribe({
        next: todos => {
            this.todos.set(todos);
            this.loading.set(false);
          },
        error: error => {
          this.error.set(error);
          this.loading.set(false);
        }
      });
  }

  // Add a new todo
  addTodo(title: string) {
    const newTodo = { title };
    this.apiService.createTodo(newTodo)
      .subscribe({
          next: (todo) => {
            this.todos.update(todos => todos.concat([todo]));
          },
          error: error => {
            this.error.set(error);
          }
        });
  }

  // Update a todo
  updateTodo(todo: Todo) {
    this.apiService.updateTodo(todo)
      .subscribe({
        next: () => {
          this.todos.update(todos => todos.map(t => t.id === todo.id ? t = todo : t));
        },
        error: error => {
          this.error.set(error);
        }
      });
  }

  // Delete a todo
  deleteTodo(id: number) {
    this.apiService.deleteTodo(id)
      .subscribe({
        next:() => {
          this.todos.update(todos => todos.filter(t => t.id !== id));
        },
        error: error => {
          this.error.set(error.error);
        }
      });
  }

  // Toggle a todo's isComplete property
  toggleIsComplete(id: number) {
    const item = this.todos().find((item) => item.id === id);
    if(item) {
      this.updateTodo({ ...item, isComplete: !item.isComplete });
    } else {
      this.error.set('Todo not found');
    }
  }
}
