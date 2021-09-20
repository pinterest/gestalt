describe('Iconography and SVGs Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/iconography_and_svgs');
    cy.injectAxe();
  });

  // Disable the test for now since it's timing out on GitHub CI
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Iconography and SVGs page', () => {
    cy.checkA11y();
  });
});
