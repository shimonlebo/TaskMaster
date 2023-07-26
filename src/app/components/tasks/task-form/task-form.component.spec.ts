import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddTask } from '../task.state';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFormComponent ],
      imports: [FormsModule, ReactiveFormsModule, Store, AddTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // Test for the form
  // it('should have a form with 1 control', () => {
  //   expect(component.taskForm.contains('title')).toBeTruthy();
  // });

  // Test title required
  // it('should make the title control required', () => {
  //   const control = component.taskForm.get('title');
  //   control?.setValue('');
  //   expect(control?.valid).toBeFalsy();
  // });

  // Test tite maxlength
  // it('should make the title control max length 100', () => {
  //   const control = component.taskForm.get('title');
  //   control?.setValue(''.padEnd(101, 'a'));
  //   expect(control?.valid).toBeFalsy();
  // });

  // Test form submit
  // it('should submit the form', () => {
  //   const control = component.taskForm.get('title');
  //   control?.setValue('test');
  //   expect(component.taskForm.valid).toBeTruthy();
  // });

  // Test form reset
  // it('should reset the form', () => {
  //   const control = component.taskForm.get('title');
  //   control?.setValue('test');
  //   component.onSubmit();
  //   expect(control?.value).toBeNull();
  // });
});
