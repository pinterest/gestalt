describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('Tests accessibility on the root page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'link-name',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
