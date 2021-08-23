describe('Screen sizes Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/Screen_Sizes');
    cy.injectAxe();
  });

  it('Tests accessibility on the ScreenSizes page', () => {
    cy.checkA11y();
  });
});
