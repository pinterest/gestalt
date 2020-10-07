describe('Image Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Image');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Image page', () => {
    cy.checkA11y();
  });
});
