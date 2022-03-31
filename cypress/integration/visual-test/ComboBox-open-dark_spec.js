describe('ComboBox visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/ComboBox-open-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').find('label').click();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'ComboBox-open-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
