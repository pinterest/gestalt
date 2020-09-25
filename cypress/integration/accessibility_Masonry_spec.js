describe('Masonry Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Masonry');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Masonry page', () => {
    cy.checkA11y();
  });
});
