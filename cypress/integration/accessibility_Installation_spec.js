describe('Installation Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/installation');
    cy.injectAxe();
  });

  it('Tests accessibility on the Installation page', () => {
    cy.checkA11y();
  });
});
