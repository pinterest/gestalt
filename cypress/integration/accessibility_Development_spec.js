describe('Development Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Development');
    cy.injectAxe();
  });

  it('Tests accessibility on the Development page', () => {
    cy.checkA11y();
  });
});
