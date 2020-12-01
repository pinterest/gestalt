describe('AvatarPair Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/AvatarPair');
    cy.injectAxe();
  });

  it('Tests accessibility on the AvatarPair page', () => {
    cy.checkA11y();
  });
});
