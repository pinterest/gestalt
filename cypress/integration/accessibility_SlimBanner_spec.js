describe('SlimBanner Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/slimbanner');
    cy.injectAxe();
  });

  it('Tests accessibility on the SlimBanner page', () => {
    cy.checkA11y();
  });
});
