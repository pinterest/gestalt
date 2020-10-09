describe('Badge Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Badge');
    cy.injectAxe();
  });

  it('Tests accessibility on the Badge page', () => {
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
