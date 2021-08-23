describe('Callout Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/callout');
    cy.injectAxe();
  });

  it('Tests accessibility on the Callout page', () => {
    cy.checkA11y();
  });
});
