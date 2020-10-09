describe('Pulsar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Pulsar');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Pulsar page', () => {
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
