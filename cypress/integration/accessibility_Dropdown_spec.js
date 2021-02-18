describe('Dropdown Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Dropdown');
    cy.injectAxe();
  });

  it('Tests accessibility on the Dropdown page', () => {
    // Keep disabled until link colors updated
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
