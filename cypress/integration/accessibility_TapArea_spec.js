describe('TapArea Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/TapArea');
    cy.injectAxe();
  });

  it('Tests accessibility on the TapArea page', () => {
    // Keep disabled until converted to new docs components
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
