describe('RadioGroup dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/RadioGroup-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'RadioGroup-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
