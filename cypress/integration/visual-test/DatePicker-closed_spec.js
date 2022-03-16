describe('DatePicker visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/DatePicker-closed');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'DatePicker-closed',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
