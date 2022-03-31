describe('TextField visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/TextField');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'TextField',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
