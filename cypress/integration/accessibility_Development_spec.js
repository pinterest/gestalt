describe('Development Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/development');
    cy.injectAxe();
  });

  it('Tests accessibility on the Development page', () => {
    cy.checkA11y();
  });
});
