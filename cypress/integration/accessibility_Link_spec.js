describe('Link Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/link');
    cy.injectAxe();
  });

  it('Tests accessibility on the Link page', () => {
    cy.checkA11y();
  });
});
