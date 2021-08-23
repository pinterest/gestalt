describe('Color Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Color');
    cy.injectAxe();
  });

  // Disabling until we add the Color page back in
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Color page', () => {
    cy.checkA11y();
  });
});
