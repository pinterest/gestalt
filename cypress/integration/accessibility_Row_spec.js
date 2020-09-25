describe('Row Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Row');
    cy.injectAxe();
  });

  it('Tests accessibility on the Row page', () => {
    cy.checkA11y();
  });
});
