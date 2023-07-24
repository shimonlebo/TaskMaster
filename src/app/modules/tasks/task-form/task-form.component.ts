import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddTask } from '../task.state';

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

  onSubmit() {
    if (this.taskForm.valid) {
      const id = this.store.selectSnapshot(state => state.tasks.tasks.length) + 1; 
      const title = this.taskForm.value.title;    
      this.store.dispatch(new AddTask({ id, title, completed: false }));
      this.taskForm.reset();
    } else {
      console.log('Invalid Task');
    }
  }
  
  private initializeForm() {
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

}
