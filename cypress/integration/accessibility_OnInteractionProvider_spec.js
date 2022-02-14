describe('OnInteractionProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/oninteractionprovider');
    cy.injectAxe();
  });

  it('Tests accessibility on the OnInteractionProvider page', () => {
    cy.checkA11y();
  });
});
