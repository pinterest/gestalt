describe('TapArea Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/TapArea');
    cy.injectAxe();
  });

  it('Tests accessibility on the TapArea page', () => {
    cy.checkA11y();
  });
});
