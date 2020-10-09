describe('SegmentedControl Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SegmentedControl');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the SegmentedControl page', () => {
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
