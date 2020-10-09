describe('Callout Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Callout');
    cy.injectAxe();
  });

  it('Tests accessibility on the Callout page', () => {
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
