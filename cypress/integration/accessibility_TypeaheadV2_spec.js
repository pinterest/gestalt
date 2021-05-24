describe('TypeaheadV2 Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/TypeaheadV2');
    cy.injectAxe();
  });

  it('Tests accessibility on the TypeaheadV2 page', () => {
    cy.checkA11y();
  });
});
