describe('Spinner Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Spinner');
    cy.injectAxe();
  });

  it('Tests accessibility on the Spinner page', () => {
    cy.checkA11y();
  });
});
