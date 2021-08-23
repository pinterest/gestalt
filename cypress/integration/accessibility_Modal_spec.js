describe('Modal Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/modal');
    cy.injectAxe();
  });

  it('Tests accessibility on the Modal page', () => {
    cy.checkA11y();
  });
});
