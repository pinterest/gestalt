describe('Masonry Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Masonry');
    cy.injectAxe();
  });

  it('Tests accessibility on the Masonry page', () => {
    cy.checkA11y();
  });
});
