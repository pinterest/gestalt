describe('Pog visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Pog');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Pog',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
