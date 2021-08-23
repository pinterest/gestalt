describe('Collage Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/collage');
    cy.injectAxe();
  });

  it('Tests accessibility on the Collage page', () => {
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
