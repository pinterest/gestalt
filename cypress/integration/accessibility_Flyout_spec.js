describe('Flyout Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Flyout');
    cy.injectAxe();
  });

  it('Tests accessibility on the Flyout page', () => {
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
