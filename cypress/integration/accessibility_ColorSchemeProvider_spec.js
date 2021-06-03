describe('ColorSchemeProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ColorSchemeProvider');
    cy.injectAxe();
  });

  it('Tests accessibility on the ColorSchemeProvider page', () => {
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
