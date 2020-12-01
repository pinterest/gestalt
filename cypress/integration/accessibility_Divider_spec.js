describe('Divider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Divider');
    cy.injectAxe();
  });

  it('Tests accessibility on the Divider page', () => {
    cy.checkA11y();
  });
});
