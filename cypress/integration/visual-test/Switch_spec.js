describe('Switch visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/Switch');
  });

  it('Compares screenshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'Switch',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
