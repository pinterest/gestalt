describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('Tests accessibility on the root page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'color-contrast',
          enabled: false,
        },
        {
          id: 'link-name',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
