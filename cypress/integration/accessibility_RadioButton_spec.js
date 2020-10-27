describe('RadioButton Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/RadioButton');
    cy.injectAxe();
  });

  it('Tests accessibility on the RadioButton page', () => {
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
