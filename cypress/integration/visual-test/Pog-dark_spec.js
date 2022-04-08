describe('Pog visual dark mode regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Pog-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Pog-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
