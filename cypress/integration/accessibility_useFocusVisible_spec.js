describe('useFocusVisible Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/usefocusvisible');
    cy.injectAxe();
  });

  it('Tests accessibility on the useFocusVisible page', () => {
    cy.checkA11y();
  });
});
