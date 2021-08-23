describe('Tabs Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/tabs');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Tabs page', () => {
    cy.checkA11y();
  });
});
