describe('Flex Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Flex');
    cy.injectAxe();
  });

  it('Tests accessibility on the Flex page', () => {
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
