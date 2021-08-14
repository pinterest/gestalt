describe('Color Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Color');
    cy.injectAxe();
  });

  it('Tests accessibility on the Color page', () => {
    cy.checkA11y();
  });
});
