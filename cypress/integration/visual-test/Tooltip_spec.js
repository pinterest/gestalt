describe('Tooltip visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Tooltip');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').find('button').first().focus();

    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Tooltip',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
