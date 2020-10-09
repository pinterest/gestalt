describe('Link Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Link');
    cy.injectAxe();
  });

  it('Tests accessibility on the Link page', () => {
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
