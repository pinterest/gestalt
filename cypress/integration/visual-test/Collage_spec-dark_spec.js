describe('Collage dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Collage-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Collage-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
