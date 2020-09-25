describe('Provider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Provider');
    cy.injectAxe();
  });

  it('Tests accessibility on the Provider page', () => {
    cy.checkA11y();
  });
});
