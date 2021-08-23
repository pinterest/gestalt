describe('ColorSchemeProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/colorschemeprovider');
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
