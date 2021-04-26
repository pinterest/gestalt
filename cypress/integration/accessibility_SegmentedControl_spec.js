describe('SegmentedControl Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/SegmentedControl');
    cy.injectAxe();
  });

  it('Tests accessibility on the SegmentedControl page', () => {
    cy.checkA11y();
  });
});
