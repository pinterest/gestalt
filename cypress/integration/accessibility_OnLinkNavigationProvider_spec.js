describe('OnLinkNavigationProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/onlinknavigationprovider');
    cy.injectAxe();
  });

  it('Tests accessibility on the OnLinkNavigationProvider page', () => {
    cy.checkA11y();
  });
});
