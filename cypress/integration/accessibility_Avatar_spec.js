describe('Avatar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/avatar');
    cy.injectAxe();
  });

  it('Tests accessibility on the Avatar page', () => {
    cy.checkA11y();
  });
});
