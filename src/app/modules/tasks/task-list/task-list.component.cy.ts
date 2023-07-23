import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => { 
  it('mounts', () => {
    cy.mount(TaskListComponent)
  });

  it('should have a box', () => {
    cy.mount(TaskListComponent)
    cy.get('.box').should('exist');
  });
  
});