describe('ActivationCard Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ActivationCard');
    cy.injectAxe();
  });

  it('Tests accessibility on the ActivationCard page', () => {
    cy.checkA11y();
  });
});
