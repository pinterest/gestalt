describe('Design Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/design');
    cy.injectAxe();
  });

  it('Tests accessibility on the Design page', () => {
    cy.checkA11y();
  });
});
