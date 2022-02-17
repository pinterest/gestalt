describe('Color usage Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/color_usage');
    cy.injectAxe();
  });

  it('Tests accessibility on the Color usage page', () => {
    cy.checkA11y();
  });
});
