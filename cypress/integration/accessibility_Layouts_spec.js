describe('Layouts Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/layouts');
    cy.injectAxe();
  });

  it('Tests accessibility on the Layouts page', () => {
    cy.checkA11y();
  });
});
