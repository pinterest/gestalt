describe('Iconography and SVGs Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/iconography_and_svgs');
    cy.injectAxe();
  });

  it('Tests accessibility on the Iconography and SVGs page', () => {
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
