import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoStateService } from 'src/app/services/todo-state.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private stateService: TodoStateService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      console.log('Invalid Task');
      return;
    }
    this.stateService.addTodo(this.taskForm.value.title);
    this.taskForm.reset();
  }

  private initializeForm(): void {
    // TODO: Add description field
    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }
}
