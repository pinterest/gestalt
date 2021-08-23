describe('TextArea Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/textarea');
    cy.injectAxe();
  });

  it('Tests accessibility on the TextArea page', () => {
    cy.checkA11y();
  });
});
