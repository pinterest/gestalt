describe('Flyout Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Flyout');
    cy.injectAxe();
  });

  it('Tests accessibility on the Flyout page', () => {
    cy.checkA11y();
  });
});
