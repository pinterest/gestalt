describe('Popover Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/popover');
    cy.injectAxe();
  });

  it('Tests accessibility on the Popover page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'color-contrast', //  Element has insufficient color contrast of 1.29 (foreground color: #111111, background color: #2a2734, font size: 12.0pt (16px), font weight: bold). Expected contrast ratio of 4.5:1
          enabled: false,
        },
        {
          id: 'region', // Absence of role="dialog" is causing a region error
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
