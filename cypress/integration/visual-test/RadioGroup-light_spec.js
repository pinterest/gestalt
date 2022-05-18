describe('RadioGroup light mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/RadioGroup-light');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'RadioGroup-light',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
