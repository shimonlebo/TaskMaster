import { TaskFormComponent } from './task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createOutputSpy } from 'cypress/angular';

describe('TaskFormComponent', () => {
  // Test mount
  it('mounts', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    })
  });

  // Test title input
  it('should have a title input', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    })
    cy.get('[formControlName=title]').should('exist')
  });

  // Test form submit
  it('should submit the form', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    });
    cy.get('[formControlName=title]').type('test');
    cy.get('form').submit();
  });

  // Test form reset
  it('should reset the form', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    });
    cy.get('[formControlName=title]').type('test');
    cy.get('form').submit();
    cy.get('[formControlName=title]').should('have.value', '');
  });

  // Test taskCreated event
  it('should emit the taskCreated event', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule],
      componentProperties: {
        taskCreated: createOutputSpy('taskCreated')
      }
    });
    cy.get('[formControlName=title]').type('test');
    cy.get('form').submit();
    cy.get('@taskCreated').should('have.been.calledOnce');
  });
  
});