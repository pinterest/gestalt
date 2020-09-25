describe('Sheet Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Sheet');
    cy.injectAxe();
  });

  it('Tests accessibility on the Sheet page', () => {
    cy.checkA11y();
  });
});
