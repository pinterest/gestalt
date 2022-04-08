describe('Toast visual dark mode regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Toast-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Toast-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
