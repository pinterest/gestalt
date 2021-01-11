describe('Dropdown Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Dropdown');
    cy.injectAxe();
  });

  it('Tests accessibility on the Dropdown page', () => {
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
