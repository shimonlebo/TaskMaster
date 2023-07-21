import { Component, OnInit } from '@angular/core';
import { TodoTask as Task } from '../task.model';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  // TrackBy function to improve performance
  trackByFn(index: number, task: Task): number {
    return task.id;
  }

  addTask(title: string): void {
    const task: Task = {
      id: this.tasks.length + 1,
      title,
      completed: false
    };
    this.tasks.push(task);
    console.log('task added', task);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    console.log('task deleted', id);
  }

  toggleCompleted(id: number): void {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    console.log('task completed', id);
  }


}
