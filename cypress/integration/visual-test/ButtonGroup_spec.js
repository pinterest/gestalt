describe('ButtonGroup visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ButtonGroup');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ButtonGroup',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
