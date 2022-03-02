describe('Status Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/status');
    cy.injectAxe();
  });

  it('Tests accessibility on the Status page', () => {
    cy.checkA11y();
  });
});
