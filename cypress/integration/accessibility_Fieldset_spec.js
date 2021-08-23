describe('Fieldset Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/fieldset');
    cy.injectAxe();
  });

  it('Tests accessibility on the Fieldset page', () => {
    cy.checkA11y();
  });
});
