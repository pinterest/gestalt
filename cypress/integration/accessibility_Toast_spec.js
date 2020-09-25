describe('Toast Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Toast');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Toast page', () => {
    cy.checkA11y();
  });
});
