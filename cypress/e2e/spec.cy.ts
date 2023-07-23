describe('Main Test', () => {
  it('Creates, checks and deletes a task', () => {
    cy.visit('http://localhost:4200/');
    // Test the input field
    cy.get('[data-cy=task-input]').type('Test Task').type('{enter}');
    cy.get('[data-cy=task-field]').should('have.length', 1);
    cy.get('[data-cy=task-value]').should('have.value', 'Test Task');
    // Test the checkbox
    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=task-value]').should('have.class', 'completed');
    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=task-value]').should('not.have.class', 'completed');
    // Test the delete button
    cy.get('[data-cy=delete]').click();
    cy.get('[data-cy=task-field]').should('not.exist');
  });
});