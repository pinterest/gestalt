describe('SearchField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SearchField');
    cy.injectAxe();
  });

  it('Tests accessibility on the SearchField page', () => {
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
