describe('Roadmap check', () => {
  beforeEach(() => {
    cy.visit('/roadmap');
    cy.injectAxe();
  });

  it('Tests accessibility on the Roadmap page', () => {
    cy.checkA11y();
  });
});
