describe('Module Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/module');
    cy.injectAxe();
  });

  it('Tests accessibility on the Module page', () => {
    cy.checkA11y();
  });
});
