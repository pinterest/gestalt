describe('SearchField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/searchfield');
    cy.injectAxe();
  });

  it('Tests accessibility on the SearchField page', () => {
    cy.checkA11y();
  });
});
