describe('Switch Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/switch');
    cy.injectAxe();
  });

  it('Tests accessibility on the Switch page', () => {
    cy.checkA11y();
  });
});
