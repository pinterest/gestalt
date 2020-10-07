describe('ExpandableModule Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ExpandableModule');
    cy.injectAxe();
  });

  it('Tests accessibility on the ExpandableModule page', () => {
    cy.checkA11y();
  });
});
