describe('Faq Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/faq');
    cy.injectAxe();
  });

  it('Tests accessibility on the Faq page', () => {
    cy.checkA11y();
  });
});
