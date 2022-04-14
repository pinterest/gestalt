describe('Color examples Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/color_examples');
    cy.injectAxe();
  });

  it('Tests accessibility on the Color examples page', () => {
    cy.checkA11y();
  });
});
