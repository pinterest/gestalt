describe('Avatar dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Avatar-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Avatar-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
