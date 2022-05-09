describe('SlimBanner light mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/SlimBanner-light');
  });

  // eslint-disable-next-line jest/expect-expect
  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'SlimBanner-light',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
