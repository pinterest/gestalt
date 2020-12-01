describe('Container Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Container');
    cy.injectAxe();
  });

  it('Tests accessibility on the Container page', () => {
    cy.checkA11y();
  });
});
