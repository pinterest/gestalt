describe('Sticky Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Sticky');
    cy.injectAxe();
  });

  it('Tests accessibility on the Sticky page', () => {
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
