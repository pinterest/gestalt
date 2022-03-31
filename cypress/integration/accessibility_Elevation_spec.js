describe('Elevation Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/elevation');
    cy.injectAxe();
  });

  it('Tests accessibility on the Elevation page', () => {
    cy.checkA11y();
  });
});
