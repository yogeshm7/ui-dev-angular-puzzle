describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: Should add book to list, remove it and undo action', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1)
      .first()
      .within(() => {
        cy.get('[data-testing="add-book"]').contains('Want to Read').click();
      });

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 1)
    cy.get('[data-testing="remove-book"]').click();
    cy.get('.mat-simple-snackbar').should('be.visible');
    cy.get('.mat-simple-snackbar').contains('Undo').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length.greaterThan', 0)
  });
});
