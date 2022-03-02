describe('ComponentName Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/componentname');
    cy.injectAxe();
  });

  it('Tests accessibility on the ComponentName page', () => {
    cy.checkA11y();
  });
});
