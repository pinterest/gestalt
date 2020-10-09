describe('Modal Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Modal');
    cy.injectAxe();
  });

  it('Tests accessibility on the Modal page', () => {
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
