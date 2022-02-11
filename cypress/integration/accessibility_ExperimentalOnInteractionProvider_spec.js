describe('ExperimentalOnInteractionProvider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/experimentaloninteractionprovider');
    cy.injectAxe();
  });

  it('Tests accessibility on the ExperimentalOnInteractionProvider page', () => {
    cy.checkA11y();
  });
});
