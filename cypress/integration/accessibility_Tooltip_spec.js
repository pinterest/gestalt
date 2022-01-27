describe('Tooltip Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/tooltip');
    cy.injectAxe();
  });

  it('Tests accessibility on the Tooltip page', () => {
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
