describe('Avatar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Avatar');
    cy.injectAxe();
  });

  it('Tests accessibility on the Avatar page', () => {
    cy.checkA11y();
  });
});
