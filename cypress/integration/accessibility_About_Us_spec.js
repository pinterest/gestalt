describe('About us Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/about_us');
    cy.injectAxe();
  });

  it('Tests accessibility on the About us page', () => {
    cy.checkA11y();
  });
});
