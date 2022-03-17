describe('AvatarGroup dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/AvatarGroup-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'AvatarGroup-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
