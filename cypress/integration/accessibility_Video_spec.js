describe('Video Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Video');
    cy.injectAxe();
  });

  it('Tests accessibility on the Video page', () => {
    cy.checkA11y();
  });
});
