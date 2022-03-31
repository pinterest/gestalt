describe('PageHeader visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/PageHeader-maxWidth');
  });

  const BREAKPOINTS = { sm: 576, md: 768, lg: 1312 };

  Object.keys(BREAKPOINTS).forEach((size) => {
    it(`Compares snapshots on ${size} breakpoint`, () => {
      cy.viewport(BREAKPOINTS[size], 1080);
      cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
        name: `PageHeader-maxWidth-${size}`,
        imageConfig: {
          threshold: 0.001,
          thresholdType: 'percent',
        },
      });
    });
  });
});
