describe('How to Hack Around Gestalt Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/how_to_hack_around_gestalt');
    cy.injectAxe();
  });

  it('Tests accessibility on the How To Hack Around Gestalt page', () => {
    cy.checkA11y();
  });
});
