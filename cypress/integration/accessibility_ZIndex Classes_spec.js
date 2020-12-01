describe('ZIndex Classes Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ZIndex Classes');
    cy.injectAxe();
  });

  it('Tests accessibility on the ZIndex Classes page', () => {
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
