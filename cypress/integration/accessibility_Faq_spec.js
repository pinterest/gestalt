describe('Faq Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Faq');
    cy.injectAxe();
  });

  it('Tests accessibility on the Faq page', () => {
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
