describe('Flex Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Flex');
    cy.injectAxe();
  });

  it('Tests accessibility on the Flex page', () => {
    cy.checkA11y();
  });
});
