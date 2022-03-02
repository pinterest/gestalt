describe('Container Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/container');
    cy.injectAxe();
  });

  it('Tests accessibility on the Container page', () => {
    cy.checkA11y();
  });
});
