describe('Letterbox Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Letterbox');
    cy.injectAxe();
  });

  it('Tests accessibility on the Letterbox page', () => {
    cy.checkA11y();
  });
});
