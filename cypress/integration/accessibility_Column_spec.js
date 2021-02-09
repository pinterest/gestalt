describe('Column Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Column');
    cy.injectAxe();
  });

  it('Tests accessibility on the Column page', () => {
    cy.checkA11y();
  });
});
