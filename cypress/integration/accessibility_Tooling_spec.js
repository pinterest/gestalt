describe('Iconography and SVGs Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/tooling');
    cy.injectAxe();
  });

  it('Tests accessibility on the Tooling page', () => {
    cy.checkA11y();
  });
});
