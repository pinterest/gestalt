describe('TextField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/TextField');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextField page', () => {
    cy.checkA11y();
  });
});
