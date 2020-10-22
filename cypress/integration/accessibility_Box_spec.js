describe('Box Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Box');
    cy.injectAxe();
  });

  it('Tests accessibility on the Box page', () => {
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
