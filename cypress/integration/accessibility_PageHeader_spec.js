describe('PageHeader Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/PageHeader');
    cy.injectAxe();
  });

  it('Tests accessibility on the PageHeader page', () => {
    cy.checkA11y();
  });
});
