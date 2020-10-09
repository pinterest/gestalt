describe('TextArea Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/TextArea');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextArea page', () => {
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
