describe('useFocusVisible Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/useFocusVisible');
    cy.injectAxe();
  });

  it('Tests accessibility on the useFocusVisible page', () => {
    cy.checkA11y();
  });
});
