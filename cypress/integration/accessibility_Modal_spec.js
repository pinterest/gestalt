describe('Modal Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Modal');
    cy.injectAxe();
  });

  it('Tests accessibility on the Modal page', () => {
    cy.checkA11y();
  });
});
