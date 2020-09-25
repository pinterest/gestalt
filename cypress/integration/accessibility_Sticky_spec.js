describe('Sticky Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Sticky');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Sticky page', () => {
    cy.checkA11y();
  });
});
