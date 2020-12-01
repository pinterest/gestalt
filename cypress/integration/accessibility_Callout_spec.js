describe('Callout Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Callout');
    cy.injectAxe();
  });

  it('Tests accessibility on the Callout page', () => {
    cy.checkA11y();
  });
});
