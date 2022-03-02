describe('useReducedMotion Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/usereducedmotion');
    cy.injectAxe();
  });

  it('Tests accessibility on the useReducedMotion page', () => {
    cy.checkA11y();
  });
});
