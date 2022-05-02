describe('Flex visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Flex');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Flex',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
