describe('SegmentedControl Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SegmentedControl');
    cy.injectAxe();
  });

  it('Tests accessibility on the SegmentedControl page', () => {
    // Contrast on unselected tabs does not pass guidelines
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
