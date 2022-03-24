describe('Fieldset dark mode visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Fieldset-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Fieldset-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
