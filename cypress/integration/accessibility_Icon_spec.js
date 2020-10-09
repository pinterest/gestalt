describe('Icon Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Icon');
    cy.injectAxe();
  });

  it('Tests accessibility on the Icon page', () => {
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
