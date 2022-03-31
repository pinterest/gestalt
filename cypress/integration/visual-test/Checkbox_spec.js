describe('Checkbox visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Checkbox');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Checkbox',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
