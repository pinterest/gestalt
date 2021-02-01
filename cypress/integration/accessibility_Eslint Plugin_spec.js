describe('Eslint Plugin Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Eslint Plugin');
    cy.injectAxe();
  });

  it('Tests accessibility on the Eslint Plugin page', () => {
    cy.checkA11y();
  });
});
