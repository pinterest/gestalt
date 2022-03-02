describe('Page Headers', () => {
  beforeEach(() => {
    cy.visit('/whats_new');
  });

  it("Loads the What's New page", () => {
    cy.get('.docSearch-content h1').invoke('text').invoke('trim').should('include', "What's New");
  });

  it('navigates to the development page', () => {
    cy.contains('a', 'Development').click();
    cy.url().should('match', /development/);
    cy.get('.docSearch-content h1').invoke('text').invoke('trim').should('equal', 'Development');
    cy.url().should('include', Cypress.config('baseUrl'));
  });
});
