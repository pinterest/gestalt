describe('Label Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Label');
    cy.injectAxe();
  });

  it('Tests accessibility on the Label page', () => {
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
