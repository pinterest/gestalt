describe('Layouts Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Layouts');
    cy.injectAxe();
  });

  it('Tests accessibility on the Layouts page', () => {
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
