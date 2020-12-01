describe('SearchField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SearchField');
    cy.injectAxe();
  });

  it('Tests accessibility on the SearchField page', () => {
    cy.checkA11y();
  });
});
