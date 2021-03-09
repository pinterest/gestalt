describe('DataPoint Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/DataPoint');
    cy.injectAxe();
  });

  it('Tests accessibility on the DataPoint page', () => {
    cy.checkA11y();
  });
});
