describe('Masonry Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Masonry');
    cy.injectAxe();
  });

  it('Tests accessibility on the Masonry page', () => {
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
