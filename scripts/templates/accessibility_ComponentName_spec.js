describe('ComponentName Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ComponentName');
    cy.injectAxe();
  });

  it('Tests accessibility on the ComponentName page', () => {
    cy.checkA11y();
  });
});
