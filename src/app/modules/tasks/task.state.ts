import { State, Action, StateContext } from '@ngxs/store';
import { TodoTask as Task } from './task.model';

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
export class TaskState {
  @Action(AddTask)
  add(ctx: StateContext<TaskStateModel>, action: AddTask) {
    const state = ctx.getState();
    ctx.patchState({
      tasks: [...state.tasks, action.payload]
    });
  }

  @Action(EditTask)
  edit(ctx: StateContext<TaskStateModel>, action: EditTask) {
    const state = ctx.getState();
    ctx.patchState({
      tasks: state.tasks.map(task => {
        if (task.id === action.payload.id) {
          task.title = action.payload.title;
        }
        return task;
      })
    });
  }

  @Action(RemoveTask)
  remove(ctx: StateContext<TaskStateModel>, action: RemoveTask) {
    const state = ctx.getState();
    ctx.patchState({
      tasks: state.tasks.filter(task => task.id !== action.payload)
    });
  }

  @Action(ToggleCompleted)
  toggleCompleted(ctx: StateContext<TaskStateModel>, action: ToggleCompleted) {
    const state = ctx.getState();
    ctx.patchState({
      tasks: state.tasks.map(task => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
        return task;
      })
    });
  }
}