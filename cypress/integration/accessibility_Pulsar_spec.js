describe('Pulsar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Pulsar');
    cy.injectAxe();
  });

  it('Tests accessibility on the Pulsar page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'color-contrast',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
