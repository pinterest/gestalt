describe('Tooltip Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Tooltip');
    cy.injectAxe();
  });

  it('Tests accessibility on the Tooltip page', () => {
    cy.checkA11y();
  });
});
