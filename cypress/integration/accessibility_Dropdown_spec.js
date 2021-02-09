describe('Dropdown Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Dropdown');
    cy.injectAxe();
  });

  it('Tests accessibility on the Dropdown page', () => {
    cy.checkA11y();
  });
});
