describe('Masonry Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/masonry');
    cy.injectAxe();
  });

  it('Tests accessibility on the Masonry page', () => {
    cy.checkA11y();
  });
});
