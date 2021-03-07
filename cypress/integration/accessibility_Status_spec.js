describe('Status Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Status');
    cy.injectAxe();
  });

  it('Tests accessibility on the Status page', () => {
    cy.checkA11y();
  });
});
