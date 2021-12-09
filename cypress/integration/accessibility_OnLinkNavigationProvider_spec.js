describe('OnLinkNavigationProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/onlinknavigationprovider');
    cy.injectAxe();
  });

  it('Tests accessibility on the OnLinkNavigationProvider page', () => {
    cy.checkA11y();
  });

  // Keep disabled until converting to new Code editor
  cy.configureAxe({
    rules: [
      {
        id: 'color-contrast',
        enabled: false,
      },
    ],
  });
  cy.checkA11y();
});
