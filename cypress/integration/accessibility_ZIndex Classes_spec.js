describe('ZIndex Classes Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/zindex_classes');
    cy.injectAxe();
  });

  it('Tests accessibility on the ZIndex Classes page', () => {
    // Keep disabled until docs are converted to new design
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
