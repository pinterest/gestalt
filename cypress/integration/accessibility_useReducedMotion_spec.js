describe('useReducedMotion Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/useReducedMotion');
    cy.injectAxe();
  });

  it('Tests accessibility on the useReducedMotion page', () => {
    cy.checkA11y();
  });
});
