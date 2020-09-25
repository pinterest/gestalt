describe('IconButton Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/IconButton');
    cy.injectAxe();
  });

  it('Tests accessibility on the IconButton page', () => {
    cy.checkA11y();
  });
});
