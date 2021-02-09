describe('Pulsar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Pulsar');
    cy.injectAxe();
  });

  it('Tests accessibility on the Pulsar page', () => {
    cy.checkA11y();
  });
});
