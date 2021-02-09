describe('SelectList Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SelectList');
    cy.injectAxe();
  });

  it('Tests accessibility on the SelectList page', () => {
    cy.checkA11y();
  });
});
