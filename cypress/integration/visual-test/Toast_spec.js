describe('Toast visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Toast');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Toast',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
