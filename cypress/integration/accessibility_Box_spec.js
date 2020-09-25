describe('Box Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Box');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Box page', () => {
    cy.checkA11y();
  });
});
