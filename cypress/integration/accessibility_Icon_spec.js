describe('Icon Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/icon');
    cy.injectAxe();
  });

  it('Tests accessibility on the Icon page', () => {
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
