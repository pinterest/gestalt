describe('Icon Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/icon');
    cy.injectAxe();
  });

  it('Tests accessibility on the Icon page', () => {
    cy.checkA11y();
  });
});
