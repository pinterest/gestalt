describe('Checkbox dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Checkbox-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Checkbox-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
