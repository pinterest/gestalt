describe('Development Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Development');
    cy.injectAxe();
  });

  it('Tests accessibility on the Development page', () => {
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
