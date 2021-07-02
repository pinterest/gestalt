describe('ComboBox Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ComboBox');
    cy.injectAxe();
  });

  it('Tests accessibility on the ComboBox page', () => {
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
