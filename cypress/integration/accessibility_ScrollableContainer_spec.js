describe('ScrollableContainer Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ScrollableContainer');
    cy.injectAxe();
  });

  it('Tests accessibility on the ScrollableContainer page', () => {
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
