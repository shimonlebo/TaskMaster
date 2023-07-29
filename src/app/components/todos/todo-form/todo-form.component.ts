import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddTodo } from '../todo.state';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
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
    this.store.dispatch(new AddTodo(newTask));
    this.taskForm.reset();
  }

  private initializeForm(): void {
    // TODO: Add description field
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }
}
