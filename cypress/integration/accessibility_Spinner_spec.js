describe('Spinner Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Spinner');
    cy.injectAxe();
  });

  it('Tests accessibility on the Spinner page', () => {
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
