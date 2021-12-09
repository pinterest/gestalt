describe('OnLinkNavigationProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/onlinknavigationprovider');
    cy.injectAxe();
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

  it('Tests accessibility on the OnLinkNavigationProvider page', () => {
    cy.checkA11y();
  });
});
