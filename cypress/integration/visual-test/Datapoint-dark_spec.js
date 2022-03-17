describe('Datapoint dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Datapoint-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Datapoint-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
