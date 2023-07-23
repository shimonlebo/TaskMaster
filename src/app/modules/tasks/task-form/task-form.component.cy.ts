import { TaskFormComponent } from './task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createOutputSpy } from 'cypress/angular'

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
    cy.get('[data-cy=title]').should('exist')
  });

  // Test title required
  it('should make the title control required', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    });
    cy.get('[data-cy=title]').should('have.attr', 'required');
  });

  // Test tite maxlength
  it('should make the title control max length 100', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    });
    cy.get('[data-cy=title]').should('have.attr', 'maxlength', '100');
  });

  // Test form submit
  it('should submit the form', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    });
    cy.get('[data-cy=title]').type('test');
    cy.get('form').submit();
  });

  // Test form reset
  it('should reset the form', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule]
    });
    cy.get('[data-cy=title]').type('test');
    cy.get('form').submit();
    cy.get('[data-cy=title]').should('have.value', '');
  });

  // Test taskCreated event
  it('should emit the taskCreated event', () => {
    cy.mount(TaskFormComponent, {
      imports: [FormsModule, ReactiveFormsModule],
      componentProperties: {
        taskCreated: createOutputSpy('taskCreated')
      }
    });
    cy.get('[data-cy=title]').type('test');
    cy.get('form').submit();
    cy.get('@taskCreated').should('have.been.calledOnce');
  });
  
});

// Path: src\app\modules\tasks\task-list\task-list.component.cy.ts