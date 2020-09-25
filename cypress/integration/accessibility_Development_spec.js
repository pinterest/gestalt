describe('Development Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Development');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Development page', () => {
    cy.checkA11y();
  });
});
