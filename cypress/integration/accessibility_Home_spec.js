describe('Home Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.injectAxe();
  });

  it('Tests accessibility on the Home page', () => {
    cy.checkA11y();
  });
});
