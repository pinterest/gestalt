describe('Design Tokens Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/design_tokens');
    cy.injectAxe();
  });

  it('Tests accessibility on the Design Tokens page', () => {
    cy.checkA11y();
  });
});
