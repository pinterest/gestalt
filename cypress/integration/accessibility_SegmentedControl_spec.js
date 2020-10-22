describe('SegmentedControl Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SegmentedControl');
    cy.injectAxe();
  });

  it('Tests accessibility on the SegmentedControl page', () => {
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
