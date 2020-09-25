describe('Card Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Card');
    cy.injectAxe();
  });

  it('Tests accessibility on the Card page', () => {
    cy.checkA11y();
  });
});
