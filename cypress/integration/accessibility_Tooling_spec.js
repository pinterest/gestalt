describe('Iconography and SVGs Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/tooling');
    cy.injectAxe();
  });

  it('Tests accessibility on the Tooling page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'aria-command-name', // caused by: Tooltip wrapping TapArea on Icon with a11yLabel empty for redundancy with tooltip
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
