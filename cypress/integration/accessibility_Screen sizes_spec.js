describe('Screen sizes Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/screen_sizes');
    cy.injectAxe();
  });

  it('Tests accessibility on the ScreenSizes page', () => {
    cy.checkA11y();
  });
});
