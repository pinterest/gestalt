describe('Icon Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Icon');
    cy.injectAxe();
  });

  it('Tests accessibility on the Icon page', () => {
    cy.checkA11y();
  });
});
