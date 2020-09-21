describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('Tests accessibility on the root page', () => {
    cy.checkA11y();
  });
});
