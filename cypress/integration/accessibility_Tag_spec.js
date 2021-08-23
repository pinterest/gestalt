describe('Tag Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/tag');
    cy.injectAxe();
  });

  it('Tests accessibility on the Tag page', () => {
    cy.checkA11y();
  });
});
