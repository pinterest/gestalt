describe('TextField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/textfield');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextField page', () => {
    cy.checkA11y(null, {
      rules: {
        // Disabled to allow for label-less "Don't" example
        label: { enabled: false },
      },
    });
  });
});
