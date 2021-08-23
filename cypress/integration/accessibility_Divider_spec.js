describe('Divider Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/divider');
    cy.injectAxe();
  });

  it('Tests accessibility on the Divider page', () => {
    cy.checkA11y();
  });
});
