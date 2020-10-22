describe('Toast Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Toast');
    cy.injectAxe();
  });

  it('Tests accessibility on the Toast page', () => {
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
