describe('Image Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Image');
    cy.injectAxe();
  });

  it('Tests accessibility on the Image page', () => {
    cy.checkA11y();
  });
});
