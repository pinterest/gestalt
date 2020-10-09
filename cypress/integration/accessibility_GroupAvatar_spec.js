describe('GroupAvatar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/GroupAvatar');
    cy.injectAxe();
  });

  it('Tests accessibility on the GroupAvatar page', () => {
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
