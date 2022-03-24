describe('Fieldset visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Fieldset');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Fieldset',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
