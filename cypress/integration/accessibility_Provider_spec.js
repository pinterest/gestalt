describe('Provider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Provider');
    cy.injectAxe();
  });

  it('Tests accessibility on the Provider page', () => {
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
