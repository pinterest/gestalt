describe('AvatarPair Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/avatarpair');
    cy.injectAxe();
  });

  it('Tests accessibility on the AvatarPair page', () => {
    cy.checkA11y();
  });
});
