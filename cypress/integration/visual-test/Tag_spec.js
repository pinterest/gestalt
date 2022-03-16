describe('Tag visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Tag');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Tag',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
