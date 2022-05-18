describe('RadioButton Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/radiobutton');
    cy.injectAxe();
  });

  it('Tests accessibility on the RadioButton page', () => {
    cy.checkA11y();
  });
});
