describe('Upsell Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Upsell');
    cy.injectAxe();
  });

  it('Tests accessibility on the Upsell page', () => {
    // Upsell titles render an H3, which breaks the Docs hierarchy
    cy.configureAxe({
      rules: [
        {
          id: 'heading-order',
          enabled: false,
        },
        {
          id: 'scrollable-region-focusable',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
