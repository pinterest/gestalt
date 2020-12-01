describe('Sticky Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Sticky');
    cy.injectAxe();
  });

  it('Tests accessibility on the Sticky page', () => {
    cy.checkA11y();
  });
});
