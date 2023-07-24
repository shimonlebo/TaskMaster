import { Component, OnInit } from '@angular/core';
import { TodoTask as Task } from '../task.model';
import { Select, Store } from '@ngxs/store';
import { EditTask, RemoveTask, ToggleCompleted } from '../task.state';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Select((state: { tasks: { tasks: Task[]; }; }) => state.tasks.tasks) 
  tasks$: Observable<Task[]>;

  completedTasks$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.completedTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.completed).length)
    );
  }

  editTask(id: number, title: string): void {
    this.store.dispatch(new EditTask({ id, title }));
  }

  deleteTask(id: number): void {
    this.store.dispatch(new RemoveTask(id));
  }

  toggleCompleted(id: number): void {
    this.store.dispatch(new ToggleCompleted(id));   
  }
  
  // TrackBy function to improve performance
  trackByFn(index: number, task: Task): number {
    return task.id;
  }
}
