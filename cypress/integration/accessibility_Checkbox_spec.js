describe('Checkbox Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Checkbox');
    cy.injectAxe();
  });

  it('Tests accessibility on the Checkbox page', () => {
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
