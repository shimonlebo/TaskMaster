import { Component, OnInit } from '@angular/core';
import { TodoTask as Task } from '../task.model';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = TASKS;

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index: number, task: Task): number {
    return task.id;
  }

}
