describe('Layer Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Layer');
    cy.injectAxe();
  });

  it('Tests accessibility on the Layer page', () => {
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
