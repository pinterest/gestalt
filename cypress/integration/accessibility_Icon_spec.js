describe('Icon Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/icon');
    cy.injectAxe();
  });

  it('Tests accessibility on the Icon page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'aria-command-name',
          enabled: false,
        },
      ],
    });

    cy.checkA11y();
  });
});
