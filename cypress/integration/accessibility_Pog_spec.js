describe('Pog Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Pog');
    cy.injectAxe();
  });

  it('Tests accessibility on the Pog page', () => {
    cy.checkA11y();
  });
});
