describe('Button Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Button');
    cy.injectAxe();
  });

  it('Tests accessibility on the Button page', () => {
    cy.checkA11y();
  });
});
