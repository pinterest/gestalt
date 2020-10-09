describe('Row Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Row');
    cy.injectAxe();
  });

  it('Tests accessibility on the Row page', () => {
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
