describe('Datapoint Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Datapoint');
    cy.injectAxe();
  });

  it('Tests accessibility on the Datapoint page', () => {
    cy.checkA11y();
  });
});
