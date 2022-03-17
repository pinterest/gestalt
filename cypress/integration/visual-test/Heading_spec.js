describe('Heading visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Heading');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Heading',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
