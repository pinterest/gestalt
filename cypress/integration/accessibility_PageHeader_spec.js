describe('PageHeader Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/pageheader');
    cy.injectAxe();
  });

  it('Tests accessibility on the PageHeader page', () => {
    // PageHeader titles render an H1, which breaks the Docs hierarchy
    cy.configureAxe({
      rules: [
        {
          id: 'heading-order',
          enabled: false,
        },
        {
          id: 'color-contrast',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
