describe('GroupAvatar Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/GroupAvatar');
    cy.injectAxe();
  });

  it('Tests accessibility on the GroupAvatar page', () => {
    cy.checkA11y();
  });
});
