describe('Datapoint Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/datapoint');
    cy.injectAxe();
  });

  it('Tests accessibility on the Datapoint page', () => {
    cy.configureAxe();
    cy.checkA11y();
  });
});
