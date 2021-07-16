describe('Accessibility page Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Accessibility');
    cy.injectAxe();
  });

  it('Tests accessibility on the Accessibility page', () => {
    cy.checkA11y();
  });
});
