describe('TapArea Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/taparea');
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
