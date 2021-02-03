describe('ScrollableContainer Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ScrollableContainer');
    cy.injectAxe();
  });

  it('Tests accessibility on the ScrollableContainer page', () => {
    cy.checkA11y();
  });
});
