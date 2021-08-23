describe('Heading Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/heading');
    cy.injectAxe();
  });

  it('Tests accessibility on the Heading page', () => {
    cy.checkA11y();
  });
});
