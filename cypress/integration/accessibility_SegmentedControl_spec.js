describe('SegmentedControl Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/segmentedcontrol');
    cy.injectAxe();
  });

  it('Tests accessibility on the SegmentedControl page', () => {
    cy.checkA11y();
  });
});
