describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });

  it('Then: Should add book to list and undo the action', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1)
      .first()
      .within(() => {
        cy.get('[data-testing="add-book"]').contains('Want to Read').click();
      });

    cy.get('.mat-simple-snackbar').should('be.visible');
    cy.get('.mat-simple-snackbar').contains('Undo').click();
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-item"]').should('have.length', 0)
  });
});
