describe('Mask Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Mask');
    cy.injectAxe();
  });

  it('Tests accessibility on the Mask page', () => {
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
