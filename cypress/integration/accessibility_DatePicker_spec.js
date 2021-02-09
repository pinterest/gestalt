describe('DatePicker Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/DatePicker');
    cy.injectAxe();
  });

  it('Tests accessibility on the DatePicker page', () => {
    cy.checkA11y();
  });
});
