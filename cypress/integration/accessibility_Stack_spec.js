describe('Stack Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Stack');
    cy.injectAxe();
  });

  it('Tests accessibility on the Stack page', () => {
    cy.checkA11y();
  });
});
