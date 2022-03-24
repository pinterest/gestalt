describe('Label dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Label-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Label-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
