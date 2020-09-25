describe('RadioButton Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/RadioButton');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the RadioButton page', () => {
    cy.checkA11y();
  });
});
