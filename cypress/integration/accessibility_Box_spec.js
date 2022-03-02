describe('Box Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/box');
    cy.injectAxe();
  });

  it('Tests accessibility on the Box page', () => {
    cy.checkA11y();
  });
});
