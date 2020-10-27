describe('Image Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Image');
    cy.injectAxe();
  });

  it('Tests accessibility on the Image page', () => {
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
