describe('Eslint Plugin Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Eslint_Plugin');
    cy.injectAxe();
  });

  it('Tests accessibility on the Eslint Plugin page', () => {
    cy.checkA11y();
  });
});
