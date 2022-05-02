describe('Box dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Box-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Box-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
