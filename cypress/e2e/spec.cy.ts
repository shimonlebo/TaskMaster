describe('My First Test', () => {
  it('Visits the App', () => {
    cy.visit('http://localhost:4200/');
    // Test task being created
    cy.get('[data-cy=task-input]').type('Test Task');
    cy.get('[data-cy=task-input]').type('{enter}');
    cy.get('[data-cy=task-list] [data-cy=task]').should('have.length', 1);
    cy.get('[data-cy=task-list] [data-cy=task]').should('have.value', 'Test Task');
    // Test task being marked as completed
    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=task-list] [data-cy=task]').should('have.class', 'completed');
    // Test task being marked as uncompleted
    cy.get('[data-cy=checkbox]').click();
    cy.get('[data-cy=task-list] [data-cy=task]').should('not.have.class', 'completed');
    // Test task being deleted
    cy.get('[data-cy=delete]').click();
    cy.get('[data-cy=task-list] [data-cy=task]').should('not.exist');    
  })
})