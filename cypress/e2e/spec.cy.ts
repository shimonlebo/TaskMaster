describe('Main Test', () => {
  it('Creates, checks and deletes a task', () => {
    cy.visit('http://localhost:4200/');
    // Test the input field
    cy.get('[data-cy=task-input]').type('Test Task').type('{enter}');
    cy.get('[data-cy=task-field]').should('have.length', 1);
    cy.get('[data-cy=task-value]').should('have.value', 'Test Task');
    // Test completing a task
    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=task-value]').should('have.class', 'completed');
    // Test input being read only when completed
    cy.get('[data-cy=task-value]').should('have.attr', 'readonly');
    // test uncompleting a task
    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=task-value]').should('not.have.class', 'completed');
    // Test input not being read only when uncompleted
    cy.get('[data-cy=task-value]').should('not.have.attr', 'readonly');
    // Test editing
    cy.get('[data-cy=task-value]').type('123');
    cy.get('[data-cy=task-value]').blur();
    cy.get('[data-cy=task-value]').should('have.value', 'Test Task123');
    // Test the delete button
    cy.get('[data-cy=delete]').click();
    cy.get('[data-cy=task-field]').should('not.exist');
  });
});