describe('Tooltip visual dark mode regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Tooltip-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').find('button').first().focus();

    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Tooltip-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
