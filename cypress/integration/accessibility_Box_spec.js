describe('Box Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Box');
    cy.injectAxe();
  });

  it('Tests accessibility on the Box page', () => {
    cy.checkA11y();
  });
});
