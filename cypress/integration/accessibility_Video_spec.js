describe('Video Accessibility check', () => {
  beforeEach(() => {
    cy.visit('/video');
    cy.injectAxe();
  });

  it('Tests accessibility on the Video page', () => {
    cy.configureAxe({
      rules: [
        {
          id: 'aria-progressbar-name',
          enabled: false,
        },
      ],
    });
    cy.checkA11y();
  });
});
