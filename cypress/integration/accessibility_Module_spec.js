describe('Module Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Module');
    cy.injectAxe();
  });

  it('Tests accessibility on the Module page', () => {
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
