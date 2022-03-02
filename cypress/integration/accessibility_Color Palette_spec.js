describe('Color Palette Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/color_palette');
    cy.injectAxe();
  });

  it('Tests accessibility on the Color Palette page', () => {
    cy.checkA11y();
  });
});
