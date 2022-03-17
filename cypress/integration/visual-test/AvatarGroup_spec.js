describe('AvatarGroup visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/AvatarGroup');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'AvatarGroup',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
