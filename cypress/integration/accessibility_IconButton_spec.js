describe('IconButton Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/iconbutton');
    cy.injectAxe();
  });

  it('Tests accessibility on the IconButton page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'button-name',
          enabled: false,
        },
        {
          id: 'color-contrast',
          enabled: false,
        },
      ],
    });

    cy.checkA11y();
  });
});
