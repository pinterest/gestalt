describe('Column Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Column');
    cy.injectAxe();
  });

  it('Tests accessibility on the Column page', () => {
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
