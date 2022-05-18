describe('Radio button Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/radiobutton');
    cy.injectAxe();
  });

  it('Tests accessibility on the radiobutton page', () => {
    cy.checkA11y();
  });
});
