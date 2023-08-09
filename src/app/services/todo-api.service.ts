import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private readonly API_URL = 'http://localhost:5250/api/tasks';  

  constructor(private http: HttpClient) { }

  // GET: /tasks
  getTodos() {
    return this.http.get<Todo[]>(this.API_URL);
  }

  // GET: /tasks/:id
  getTodoById(id: number) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  // POST: /tasks
  createTodo(todo: { title: string }) {
    return this.http.post<any>(this.API_URL, todo);
  }

  // PUT: /tasks
  updateTodo(todo: Todo) {
    return this.http.put<any>(this.API_URL, todo);
  }

  // DELETE: /tasks/:id
  deleteTodo(id: number) {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
