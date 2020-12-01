describe('Switch Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Switch');
    cy.injectAxe();
  });

  it('Tests accessibility on the Switch page', () => {
    cy.checkA11y();
  });
});
