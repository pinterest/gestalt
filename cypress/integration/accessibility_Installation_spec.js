describe('Installation Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Installation');
    cy.injectAxe();
  });

  it('Tests accessibility on the Installation page', () => {
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
