describe('PageHeader visual dark mode regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/PageHeader-borderStyle-dark');
  });

  const BREAKPOINTS = { md: 768 };

  Object.keys(BREAKPOINTS).forEach((size) => {
    it(`Compares snapshots on ${size}:${BREAKPOINTS[size]}px breakpoint`, () => {
      cy.viewport(BREAKPOINTS[size], 1080);
      cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
        name: `PageHeader-borderStyle-dark-${size}`,
        imageConfig: {
          threshold: 0.001,
          thresholdType: 'percent',
        },
      });
    });
  });
});
