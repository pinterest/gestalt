describe('Label Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/label');
    cy.injectAxe();
  });

  it('Tests accessibility on the Label page', () => {
    cy.checkA11y();
  });
});
