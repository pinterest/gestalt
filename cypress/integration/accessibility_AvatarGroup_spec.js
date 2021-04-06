describe('AvatarGroup Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/AvatarGroup');
    cy.injectAxe();
  });

  it('Tests accessibility on the AvatarGroup page', () => {
    cy.checkA11y();
  });
});
