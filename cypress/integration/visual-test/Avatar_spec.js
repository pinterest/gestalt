describe('Avatar visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Avatar');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Avatar',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
