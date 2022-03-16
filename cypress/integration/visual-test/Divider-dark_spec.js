describe('Divider dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Divider-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Divider-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
