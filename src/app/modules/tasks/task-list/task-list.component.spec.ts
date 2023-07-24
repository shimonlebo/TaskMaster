import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test deleteTask
  it('should delete a task', () => {
    component.addTask('test');
    component.deleteTask(1);
    expect(component.tasks.length).toBe(0);
  });

  // Test editTask
  it('should edit a task', () => {
    component.addTask('test');
    component.editTask(0, 'test123');
    expect(component.tasks[0].title).toBe('test123');
  });

  // Test toggleCompleted
  it('should toggle completed state', () => {
    component.addTask('test');
    component.toggleCompleted(1);
    expect(component.tasks[0].completed).toBeTruthy();
  });

  // Test trackByFn
  it('should return the task id', () => {
    const task = {id: 1, title: 'test', completed: false};
    const result = component.trackByFn(0, task);
    expect(result).toBe(1);
  });

});
