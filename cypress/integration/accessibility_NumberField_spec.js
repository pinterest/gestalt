describe('NumberField Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/numberfield');
    cy.injectAxe();
  });

  it('Tests accessibility on the NumberField page', () => {
    cy.checkA11y();
  });
});
