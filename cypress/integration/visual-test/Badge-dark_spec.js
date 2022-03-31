describe('Badge dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Badge-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Badge-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
