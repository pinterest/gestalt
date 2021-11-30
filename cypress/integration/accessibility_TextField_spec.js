describe('TextField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/textfield');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextField page', () => {
    cy.checkA11y(null, {
      rules: {
        // Disabled to allow for label-less "Don't" example
        // Ideally we would exclude the "best-practices-dont-label" id instead,
        // but I was unable to get that to work
        // https://github.com/component-driven/cypress-axe/issues/55
        label: { enabled: false },
      },
    });
  });
});
