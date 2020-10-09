describe('Letterbox Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Letterbox');
    cy.injectAxe();
  });

  it('Tests accessibility on the Letterbox page', () => {
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
