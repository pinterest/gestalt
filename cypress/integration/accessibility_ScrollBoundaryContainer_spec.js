describe('ScrollBoundaryContainer Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ScrollBoundaryContainer');
    cy.injectAxe();
  });

  it('Tests accessibility on the ScrollBoundaryContainer page', () => {
    // color-contrast test disabled temporarily until individual sections can be disabled
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
