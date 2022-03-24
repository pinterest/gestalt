describe('ButtonGroup dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ButtonGroup-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ButtonGroup-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
