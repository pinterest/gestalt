describe('Switch Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Switch');
    cy.injectAxe();
  });

  it('Tests accessibility on the Switch page', () => {
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
