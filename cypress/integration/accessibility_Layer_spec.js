describe('Layer Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Layer');
    cy.injectAxe();
  });

  it('Tests accessibility on the Layer page', () => {
    cy.checkA11y();
  });
});
