describe('ActivationCard visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ActivationCard');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ActivationCard',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
