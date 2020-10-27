describe('DatePicker Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/DatePicker');
    cy.injectAxe();
  });

  it('Tests accessibility on the DatePicker page', () => {
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
