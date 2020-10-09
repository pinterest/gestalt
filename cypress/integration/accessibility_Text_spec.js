describe('Text Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Text');
    cy.injectAxe();
  });

  it('Tests accessibility on the Text page', () => {
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
