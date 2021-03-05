describe('Popover Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Popover');
    cy.injectAxe();
  });

  it('Tests accessibility on the Popover page', () => {
    cy.checkA11y();
  });
});
