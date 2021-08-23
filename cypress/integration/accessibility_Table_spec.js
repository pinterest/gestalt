describe('Table Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/table');
    cy.injectAxe();
  });

  it('Tests accessibility on the Table page', () => {
    cy.configureAxe({
      rules: [
        // Disabled until converted to new docs
        {
          id: 'color-contrast',
          enabled: false,
        },
        {
          // Disabled to avoid confusion for sticky header and column examples
          id: 'scrollable-region-focusable',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
