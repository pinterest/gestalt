describe('useReducedMotion Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/useReducedMotion');
    cy.injectAxe();
  });

  it('Tests accessibility on the useReducedMotion page', () => {
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
