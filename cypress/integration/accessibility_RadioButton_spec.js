describe('RadioButton Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/RadioButton');
    cy.injectAxe();
  });

  it('Tests accessibility on the RadioButton page', () => {
    cy.checkA11y();
  });
});
