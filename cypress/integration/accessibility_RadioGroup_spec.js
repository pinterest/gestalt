describe('RadioGroup Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/radiogroup');
    cy.injectAxe();
  });

  it('Tests accessibility on the RadioGroup page', () => {
    cy.checkA11y();
  });
});
