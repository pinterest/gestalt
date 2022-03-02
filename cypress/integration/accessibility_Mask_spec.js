describe('Mask Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/mask');
    cy.injectAxe();
  });

  it('Tests accessibility on the Mask page', () => {
    cy.checkA11y();
  });
});
