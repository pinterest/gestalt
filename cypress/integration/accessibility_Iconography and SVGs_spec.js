describe('Iconography and SVGs Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/iconography_and_svgs');
    cy.injectAxe();
  });

  it('Tests accessibility on the Iconography and SVGs page', () => {
    cy.checkA11y();
  });
});
