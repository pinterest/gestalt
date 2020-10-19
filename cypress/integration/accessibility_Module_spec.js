describe('Module Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Module');
    cy.injectAxe();
  });

  it('Tests accessibility on the Module page', () => {
    cy.checkA11y();
  });
});
