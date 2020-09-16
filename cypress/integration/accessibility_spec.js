describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('Tests accessibility on the root page page', () => {
    cy.checkA11y();
  });
});
