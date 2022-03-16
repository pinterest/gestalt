describe('Callout visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Callout');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Callout',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
