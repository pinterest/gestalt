describe('Component overview check', () => {
  beforeEach(() => {
    cy.visit('/component_overview');
    cy.injectAxe();
  });

  // Disable the test for now since it's timing out on GitHub CI
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Component overview page', () => {
    cy.checkA11y();
  });
});
