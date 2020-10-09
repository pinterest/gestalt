describe('ComponentName Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ComponentName');
    cy.injectAxe();
  });

  it('Tests accessibility on the ComponentName page', () => {
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
