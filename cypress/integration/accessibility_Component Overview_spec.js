describe('Component overview check', () => {
  beforeEach(() => {
    cy.visit('/component_overview');
    cy.injectAxe();
  });

  it('Tests accessibility on the Component overview page', () => {
    cy.checkA11y();
  });
});
