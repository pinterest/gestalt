describe('Sheet Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Sheet');
    cy.injectAxe();
  });

  it('Tests accessibility on the Sheet page', () => {
    cy.checkA11y(null, {
      rules: {
        // https://dequeuniversity.com/rules/axe/4.1/color-contrast?application=axeAPI
        'color-contrast': { enabled: false },
      },
    });
  });
});
