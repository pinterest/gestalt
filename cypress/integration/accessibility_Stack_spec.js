describe('Stack Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Stack');
    cy.injectAxe();
  });

  it('Tests accessibility on the Stack page', () => {
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
