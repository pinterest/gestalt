describe('Callout Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Callout');
    cy.injectAxe();
  });

  it('Tests accessibility on the Callout page', () => {
    // Callout titles render an H3, which breaks the Docs hierarchy
    cy.configureAxe({
      rules: [
        {
          id: 'heading-order',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
