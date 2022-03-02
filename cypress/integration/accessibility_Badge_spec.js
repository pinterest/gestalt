describe('Badge Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/badge');
    cy.injectAxe();
  });

  it('Tests accessibility on the Badge page', () => {
    cy.checkA11y();
  });
});
