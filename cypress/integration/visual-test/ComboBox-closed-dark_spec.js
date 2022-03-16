describe('ComboBox visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComboBox-closed-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComboBox-closed-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
