describe('ComboBox Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ComboBox');
    cy.injectAxe();
  });

  it('Tests accessibility on the ComboBox page', () => {
    cy.checkA11y();
  });
});
