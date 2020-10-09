describe('Container Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Container');
    cy.injectAxe();
  });

  it('Tests accessibility on the Container page', () => {
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
