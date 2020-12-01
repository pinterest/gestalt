describe('ZIndex Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ZIndex');
    cy.injectAxe();
  });

  it('Tests accessibility on the ZIndex page', () => {
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
