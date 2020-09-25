describe('ButtonGroup Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/ButtonGroup');
    cy.injectAxe();
  });

  it('Tests accessibility on the ButtonGroup page', () => {
    cy.checkA11y();
  });
});
