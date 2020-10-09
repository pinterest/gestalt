describe('Button Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Button');
    cy.injectAxe();
  });

  it('Tests accessibility on the Button page', () => {
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
