describe('Avatar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Avatar');
    cy.injectAxe();
  });

  it('Tests accessibility on the Avatar page', () => {
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
