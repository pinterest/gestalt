describe('Installation Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Installation');
    cy.injectAxe();
  });

  it('Tests accessibility on the Installation page', () => {
    cy.checkA11y();
  });
});
