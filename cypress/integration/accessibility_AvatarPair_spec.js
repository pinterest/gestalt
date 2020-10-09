describe('AvatarPair Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/AvatarPair');
    cy.injectAxe();
  });

  it('Tests accessibility on the AvatarPair page', () => {
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
