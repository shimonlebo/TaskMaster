import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddTask } from '../task.state';
import { TodoTask } from '../task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      console.log('Invalid Task');
      return;
    }    
    const newTask = {
      title: this.taskForm.value.title
    }
    this.store.dispatch(new AddTask(newTask));
    this.taskForm.reset();
  }

  private initializeForm(): void {
    // TODO: Add description field
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }
}
