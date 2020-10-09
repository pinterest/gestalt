describe('Collage Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Collage');
    cy.injectAxe();
  });

  it('Tests accessibility on the Collage page', () => {
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
