describe('IconButton Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/IconButton');
    cy.injectAxe();
  });

  it('Tests accessibility on the IconButton page', () => {
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
