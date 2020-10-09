describe('Pog Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Pog');
    cy.injectAxe();
  });

  it('Tests accessibility on the Pog page', () => {
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
