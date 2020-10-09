describe('Divider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Divider');
    cy.injectAxe();
  });

  it('Tests accessibility on the Divider page', () => {
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
