describe('Upsell Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Upsell');
    cy.injectAxe();
  });

  it('Tests accessibility on the Upsell page', () => {
    cy.checkA11y();
  });
});
