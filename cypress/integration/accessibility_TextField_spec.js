describe('TextField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/textfield');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextField page', () => {
    cy.checkA11y({
      exclude: [['#best-practices-dont-label']],
    });
  });
});
