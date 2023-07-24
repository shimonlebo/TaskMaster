import { Component, OnInit } from '@angular/core';
import { TodoTask as Task } from '../task.model';
import { Select, Store } from '@ngxs/store';
import { AddTask, EditTask, RemoveTask, ToggleCompleted } from '../task.state';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Select((state: { tasks: { tasks: any[]; }; }) => state.tasks.tasks) 
  tasks$: Observable<Task[]>;

  completedTasks$: Observable<number>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.completedTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.completed).length)
    );
    console.log(this.store.snapshot());

  }

  addTask(title: string): void {    
    const task: Task = {
      id: this.store.selectSnapshot(state => state.tasks.tasks.length) + 1,
      title: title,
      completed: false
    };
    this.store.dispatch(new AddTask(task));
    console.log('task added', task);
  }

  editTask(id: number, title: string) {
    this.store.dispatch(new EditTask({ id, title }));
    console.log(`task edited. id: ${id}, title: ${title}`);
  }

  deleteTask(id: number): void {
    this.store.dispatch(new RemoveTask(id));
    console.log('task deleted. id:', id);
  }

  toggleCompleted(id: number): void {
    this.store.dispatch(new ToggleCompleted(id));   
  }
  
  // TrackBy function to improve performance
  trackByFn(index: number, task: Task): number {
    return task.id;
  }
}
