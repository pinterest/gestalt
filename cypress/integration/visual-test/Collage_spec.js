describe('Collage visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Collage');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Collage',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
