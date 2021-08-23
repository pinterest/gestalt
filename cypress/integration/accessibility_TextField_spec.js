describe('TextField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/textfield');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextField page', () => {
    cy.checkA11y();
  });
});
