describe('Text Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/text');
    cy.injectAxe();
  });

  it('Tests accessibility on the Text page', () => {
    cy.checkA11y();
  });
});
