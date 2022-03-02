describe('Pulsar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/pulsar');
    cy.injectAxe();
  });

  it('Tests accessibility on the Pulsar page', () => {
    cy.checkA11y();
  });
});
