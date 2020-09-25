describe('Switch Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Switch');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Switch page', () => {
    cy.checkA11y();
  });
});
