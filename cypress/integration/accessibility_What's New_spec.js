describe("What's New Accessibility check", () => {
  beforeEach(() => {
    cy.visit("/What's New");
    cy.injectAxe();
  });

  it("Tests accessibility on the What's New page", () => {
    cy.configureAxe({
      rules: [
        {
          id: 'color-contrast',
          enabled: false,
        },
        {
          id: 'link-name',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
