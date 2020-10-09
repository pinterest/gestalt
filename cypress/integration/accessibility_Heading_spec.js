describe('Heading Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Heading');
    cy.injectAxe();
  });

  it('Tests accessibility on the Heading page', () => {
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
