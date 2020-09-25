describe('Table Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Table');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Table page', () => {
    cy.checkA11y();
  });
});
