describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/Button');
    cy.injectAxe();
  });

  it('Tests accessibility on the Button page', () => {
    cy.checkA11y();
  });
});
