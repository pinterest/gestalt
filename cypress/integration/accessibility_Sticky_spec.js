describe('Sticky Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Sticky');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Sticky page', () => {
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
