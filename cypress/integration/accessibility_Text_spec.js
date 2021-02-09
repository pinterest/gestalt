describe('Text Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Text');
    cy.injectAxe();
  });

  it('Tests accessibility on the Text page', () => {

    cy.checkA11y();
  });
});
