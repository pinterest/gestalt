describe('Collage Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Collage');
    cy.injectAxe();
  });

  it('Tests accessibility on the Collage page', () => {
    cy.checkA11y();
  });
});
