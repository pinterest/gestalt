describe('Card Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Card');
    cy.injectAxe();
  });

  it('Tests accessibility on the Card page', () => {
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
