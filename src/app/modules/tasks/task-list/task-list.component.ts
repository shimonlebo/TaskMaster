import { Component, OnInit } from '@angular/core';
import { TodoTask as Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  completedTasks: number = 0;

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

  editTask(index: number, title: string) {
    this.tasks[index].title = title;
    console.log('task edited', this.tasks[index]);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    console.log('task deleted', id);
  }

  toggleCompleted(id: number): void {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        task.completed = !task.completed;
        if (task.completed === true) {
          this.completedTasks += 1;
          console.log('task completed', id);
        } else {
          this.completedTasks -= 1;
          console.log('task uncompleted', id);
        }
      }
      return task;
    });    
  }
}
