describe('Button Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/button');
    cy.injectAxe();
  });

  it('Tests accessibility on the Button page', () => {
    cy.checkA11y();
  });
});
