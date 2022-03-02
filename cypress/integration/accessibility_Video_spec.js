describe('Video Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/video');
    cy.injectAxe();
  });

  it('Tests accessibility on the Video page', () => {
    cy.checkA11y();
  });
});
