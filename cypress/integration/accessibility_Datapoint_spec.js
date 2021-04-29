describe('Datapoint Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Datapoint');
    cy.injectAxe();
  });

  it('Tests accessibility on the Datapoint page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'button-name',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
