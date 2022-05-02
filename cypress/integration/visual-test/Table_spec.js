describe('Table visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Table');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Table',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
