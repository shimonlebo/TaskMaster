import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoTask as Task } from '../components/tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = 'http://localhost:5250/api/tasks';

  constructor(private http: HttpClient) { }

  // GET: /tasks
  getTasks() {
    return this.http.get<Task[]>(this.API_URL);
  }

  // GET: /tasks/:id
  getTaskById(id: number) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  // POST: /tasks
  createTask(task: any) {
    return this.http.post<any>(this.API_URL, task);
  }

  // PUT: /tasks/:id
  updateTask(task: any) {
    return this.http.put<any>(`${this.API_URL}/${task.id}`, task);
  }

  // DELETE: /tasks/:id
  deleteTask(id: number) {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  handleErrors(error: any) {
    console.log('Error: ', error);
    return error;
  }

}
