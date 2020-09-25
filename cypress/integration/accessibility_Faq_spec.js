describe('Faq Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Faq');
    cy.injectAxe();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('Tests accessibility on the Faq page', () => {
    cy.checkA11y();
  });
});
