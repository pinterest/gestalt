describe('Upsell visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Upsell');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Upsell',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
