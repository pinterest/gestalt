describe('TextField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/TextField');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextField page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'color-contrast',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
