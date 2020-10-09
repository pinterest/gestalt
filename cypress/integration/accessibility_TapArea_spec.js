describe('TapArea Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/TapArea');
    cy.injectAxe();
  });

  it('Tests accessibility on the TapArea page', () => {
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
