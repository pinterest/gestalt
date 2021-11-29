describe('TextField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/textfield');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextField page', () => {
    cy.configureAxe({
      exclude: ['#best-practices-dont-label'],
    });
    cy.checkA11y();
  });
});
