import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TodoTask } from './task.model';
import { TaskService } from 'src/app/services/task.service';
import { Injectable } from '@angular/core';

// define the shape of your state
export interface TaskStateModel {
  tasks: TodoTask[];
}

// define the actions that can be performed on the state
export class GetTasks {
  static readonly type = '[Task] Get';
}

export class AddTask {
  static readonly type = '[Task] Add';
  constructor(public payload: TodoTask) { }
}

export class RemoveTask {
  static readonly type = '[Task] Remove';
  constructor(public payload: number) { }
}

export class EditTask {
  static readonly type = '[Task] Edit';
  constructor(public payload: { id: number, title: string}) { }
}

export class ToggleCompleted {
  static readonly type = '[Task] Toggle Completed';
  constructor(public payload: number) { }
}

// define the state
@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: []
  }
})
@Injectable()
export class TaskState {
  constructor(private taskService: TaskService) { }

  @Selector()
  static getTasks(state: TaskStateModel) {
    return state.tasks;
  }
  
  @Action(GetTasks)
  get(ctx: StateContext<TaskStateModel>) {
    return this.taskService.getTasks().subscribe(tasks => {
      ctx.patchState({tasks});
    });
  }

  @Action(AddTask)
  add(ctx: StateContext<TaskStateModel>, action: AddTask) {
    this.taskService.createTask(action.payload).subscribe(task => {
      const state = ctx.getState();
      ctx.patchState({
        tasks: [...state.tasks, task]
      });
    });
  }

  // Edit a task in the state
  @Action(EditTask)
  edit(ctx: StateContext<TaskStateModel>, action: EditTask) {
    this.taskService.updateTask(action.payload).subscribe(task => {
      const state = ctx.getState();
      // update the state with the task edited
      ctx.patchState({
        tasks: state.tasks.map(t => {
          if (t.id === task.id) {
            return {
              ...t,
              ...task
            }
          }
          return t;
        })
      });
    });
  }

  // Remove a task from the state
  @Action(RemoveTask)
  remove(ctx: StateContext<TaskStateModel>, action: RemoveTask) {
    this.taskService.deleteTask(action.payload).subscribe(() => {
      const state = ctx.getState();
      // update the state with the task removed
      ctx.patchState({
        tasks: state.tasks.filter(t => t.id !== action.payload)
      });
    });
  }

  // Toggle the completed status of a task
  @Action(ToggleCompleted)
  toggleCompleted(ctx: StateContext<TaskStateModel>, action: ToggleCompleted) {
    const state = ctx.getState();
    const taskToToggle = state.tasks.find(t => t.id === action.payload);

    if (taskToToggle) {
      const updatedTask = {...taskToToggle, completed: !taskToToggle.completed};
      this.taskService.updateTask(updatedTask).subscribe(() => {
        ctx.patchState({
          tasks: state.tasks.map(t => {
            return t.id === action.payload ? updatedTask : t;
          })
        });
      });
    }
  }
}