describe('Heading Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/heading');
    cy.injectAxe();
  });

  it('Tests accessibility on the Heading page', () => {
    // Heading docs showcase all sizes, breaking the order
    cy.configureAxe({
      rules: [
        {
          id: 'heading-order',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
