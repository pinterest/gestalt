describe('Checkbox Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Checkbox');
    cy.injectAxe();
  });

  it('Tests accessibility on the Checkbox page', () => {
    cy.checkA11y();
  });
});
