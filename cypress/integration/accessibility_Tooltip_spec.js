describe('Tooltip Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Tooltip');
    cy.injectAxe();
  });

  it('Tests accessibility on the Tooltip page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'color-contrast',
          enabled: false,
        },
        {
          id: 'button-name',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
