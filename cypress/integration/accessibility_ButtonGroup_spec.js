describe('ButtonGroup Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/buttongroup');
    cy.injectAxe();
  });

  it('Tests accessibility on the ButtonGroup page', () => {
    cy.checkA11y();
  });
});
