import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<string>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Task Submitted');
      this.taskCreated.emit(this.taskForm.value.title);
      this.taskForm.reset();
    } else {
      console.log('Invalid Task');
    }
  }

}
