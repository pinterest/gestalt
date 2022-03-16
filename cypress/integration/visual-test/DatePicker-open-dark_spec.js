describe('DatePicker visual regression check', () => {
  beforeEach(() => {
    cy.visit('/visual-test/DatePicker-open-dark');
  });

  it('Compares snapshots', () => {
    cy.get('[data-test-id="visual-test"]').find('label').first().click();
    cy.get('[data-test-id="visual-test"]').toMatchImageSnapshot({
      name: 'DatePicker-open-dark',
      imageConfig: {
        threshold: 0.001,
        thresholdType: 'percent',
      },
    });
  });
});
