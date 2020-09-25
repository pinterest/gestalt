describe('Checkbox Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Checkbox');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Checkbox page', () => {
    cy.checkA11y();
  });
});
