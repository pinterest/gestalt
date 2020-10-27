describe('Box Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Box');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it('Tests accessibility on the Box page', () => {
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
