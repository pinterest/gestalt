describe('Eslint Plugin Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/eslint_plugin');
    cy.injectAxe();
  });

  it('Tests accessibility on the Eslint Plugin page', () => {
    cy.checkA11y();
  });
});
