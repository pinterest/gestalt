describe('Image Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/image');
    cy.injectAxe();
  });

  it('Tests accessibility on the Image page', () => {
    cy.checkA11y();
  });
});
