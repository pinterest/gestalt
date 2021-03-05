describe('Upsell Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Upsell');
    cy.injectAxe();
  });

  it('Tests accessibility on the Upsell page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'scrollable-region-focusable',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
