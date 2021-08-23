describe('ActivationCard Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/activationcard');
    cy.injectAxe();
  });

  it('Tests accessibility on the ActivationCard page', () => {
    cy.checkA11y();
  });
});
