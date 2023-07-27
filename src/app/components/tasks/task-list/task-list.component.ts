import { Component, OnInit } from '@angular/core';
import { TodoTask } from '../task.model';
import { Select, Store } from '@ngxs/store';
import { EditTask, GetTasks, RemoveTask, ToggleCompleted } from '../task.state';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Select((state: { tasks: { tasks: TodoTask[] } }) => state.tasks.tasks)
  tasks$: Observable<TodoTask[]>;

  completedTasks$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetTasks());

    this.completedTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.isComplete).length)
    );
  }

  editTask(task: TodoTask, value: string): void {
    task.title = value;
    this.store.dispatch(new EditTask(task));
  }

  deleteTask(id: number): void {
    this.store.dispatch(new RemoveTask(id));
  }

  toggleIsComplete(id: number): void {
    this.store.dispatch(new ToggleCompleted(id));
  }

  // TrackBy function to improve performance
  trackByFn(index: number, task: TodoTask): number {
    return task.id!;
  }
}
