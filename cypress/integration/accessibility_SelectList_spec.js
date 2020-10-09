describe('SelectList Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SelectList');
    cy.injectAxe();
  });

  it('Tests accessibility on the SelectList page', () => {
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
