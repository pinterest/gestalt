describe('Sheet Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Sheet');
    cy.injectAxe();
  });

  it('Tests accessibility on the Sheet page', () => {
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
