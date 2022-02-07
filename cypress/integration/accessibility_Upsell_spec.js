describe('Upsell Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/upsell');
    cy.injectAxe();
  });

  it('Tests accessibility on the Upsell page', () => {
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
