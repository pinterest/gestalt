describe('Datapoint Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/datapoint');
    cy.injectAxe();
  });

  it('Tests accessibility on the Datapoint page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'aria-command-name', // Tooltip provides description to the button
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
