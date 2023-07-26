import { State, Action, StateContext } from '@ngxs/store';
import { TodoTask as Task } from './task.model';
import { Injectable } from '@angular/core';

// define the shape of your state
export interface TaskStateModel {
  tasks: Task[];
}

// define the actions that can be performed on the state
export class AddTask {
  static readonly type = '[Task] Add';
  constructor(public payload: Task) { }
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
  // Add a task to the state
  @Action(AddTask)
  add(ctx: StateContext<TaskStateModel>, action: AddTask) {
    const state = ctx.getState();
    // update the state with the new task
    ctx.patchState({
      tasks: [...state.tasks, action.payload]
    });
  }

  // Edit a task in the state
  @Action(EditTask)
  edit(ctx: StateContext<TaskStateModel>, action: EditTask) {
    const state = ctx.getState();
    // update the state with the edited task
    ctx.patchState({
      tasks: state.tasks.map(task => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            title: action.payload.title
          };
        }
        return task;
      })
    });
  }

  // Remove a task from the state
  @Action(RemoveTask)
  remove(ctx: StateContext<TaskStateModel>, action: RemoveTask) {
    const state = ctx.getState();
    // update the state with the task removed
    ctx.patchState({
      tasks: state.tasks.filter(task => task.id !== action.payload)
    });
  }

  // Toggle the completed status of a task
  @Action(ToggleCompleted)
  toggleCompleted(ctx: StateContext<TaskStateModel>, action: ToggleCompleted) {
    const state = ctx.getState();
    // update the state with the task toggled
    ctx.patchState({
      tasks: state.tasks.map(task => {
        if (task.id === action.payload) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    });
  }
}