describe('SlimBanner visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/SlimBanner');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'SlimBanner',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
