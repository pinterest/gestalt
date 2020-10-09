describe('ActivationCard Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ActivationCard');
    cy.injectAxe();
  });

  it('Tests accessibility on the ActivationCard page', () => {
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
