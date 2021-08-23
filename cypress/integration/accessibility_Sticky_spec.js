describe('Sticky Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/sticky');
    cy.injectAxe();
  });

  it('Tests accessibility on the Sticky page', () => {
    cy.checkA11y();
  });
});
