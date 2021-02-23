describe('UpsellForm Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/UpsellForm');
    cy.injectAxe();
  });

  it('Tests accessibility on the UpsellForm page', () => {
    cy.checkA11y();
  });
});
