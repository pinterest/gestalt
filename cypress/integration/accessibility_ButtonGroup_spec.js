describe('ButtonGroup Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ButtonGroup');
    cy.injectAxe();
  });

  it('Tests accessibility on the ButtonGroup page', () => {
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
